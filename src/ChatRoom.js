import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { API, Storage, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

function ChatRoom({ signOut, user }) {
  const navigate = useNavigate();
  const { chatRoomId, chatRoomName } = useParams();

  const messageInputInitState = {
    text: "",
    chatRoomId: chatRoomId,
    chatUserId: user.attributes.email,
    imageKey: "",
  };
  const [messageInput, setMessageInput] = useState(messageInputInitState);

  const imgFileInitState = { file: null, thumbnail: null };
  const [imgFile, setImgFile] = useState(imgFileInitState);

  const [listChatRoomMessages, setListChatRoomMessages] = useState([]);

  // 채팅생성시 채팅창 최하단으로 이동
  const messageEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [listChatRoomMessages]);

  // 채팅 메시지 받아오기
  const fetchMessagesByDate = async () => {
    try {
      const {
        data: {
          messagesByDate: { items },
        },
      } = await API.graphql({
        query: queries.messagesByDate,
        variables: {
          chatRoomId: chatRoomId,
          sortDirection: "DESC",
          limit: 20,
        },
      });

      // 이미지 키가 포함된 메시지는 이미지 파일을 다운 및 변환
      const itemsWithImgUrl = await Promise.all(
        items.map(async (item) => {
          const { imageKey } = item;

          if (imageKey) {
            const imgFile = await Storage.get(imageKey, { download: true });

            const blob = new Blob([imgFile.Body], { type: "image/png" });
            const imageUrl = URL.createObjectURL(blob);

            item.imageUrl = imageUrl;
          }

          return item;
        })
      );

      setListChatRoomMessages([...itemsWithImgUrl]);
    } catch (error) {
      console.log("listChatRoomMessage", error);
    }
  };

  // 채팅방 진입시 메시지 받아오기
  useEffect(() => {
    fetchMessagesByDate();
  }, []);

  // 메시지 보내기
  const createMessage = async (imageKey) => {
    try {
      const res = await API.graphql({
        query: mutations.createMessage,
        variables: { input: { ...messageInput, imageKey: imageKey } },
      });

      console.log("createMessage", res);
    } catch (error) {
      console.log("createMessage", error);
    }
  };

  // 이미지 S3에 업로드
  const uploadToS3Bucket = async (imageFile) => {
    try {
      if (imageFile) {
        const { key } = await Storage.put(`${Date.now()}`, imageFile, {
          contentType: "image/png",
        });

        return key;
      }

      return "";
    } catch (error) {
      console.log("uploadToS3Bucket", error);
    }
  };

  // dynamoDB에서 메서지 생성을 구독
  useEffect(() => {
    const subOnCreateMessage = () => {
      return API.graphql(
        graphqlOperation(subscriptions.onCreateMessage)
      ).subscribe({
        next: () => {
          fetchMessagesByDate();
        },
        error: (error) => console.log(error),
      });
    };

    const subCreateMessage = subOnCreateMessage();
    return () => {
      subCreateMessage.unsubscribe();
    };
  }, []);

  // 보내기 버튼 클릭시
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageKey = "";

    if (messageInput.text.trim() === "" && imgFile.file === null) {
      return;
    }

    imageKey = await uploadToS3Bucket(imgFile.file);

    createMessage(imageKey);
    setImgFile(imgFileInitState);
    setMessageInput(messageInputInitState);
  };

  // 이미지 선택시
  const handleChangeImageInput = (e) => {
    const {
      target: { files },
    } = e;

    const file = files[0];

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile({
        file: file,
        thumbnail: reader.result,
      });
    };
  };

  // preview 이미지 지우기
  const handleClickDeletePreviewImg = () => {
    setImgFile({ file: null, thumbnail: null });
  };

  const handleChangeMessageInput = (e) => {
    const {
      target: { value },
    } = e;

    setMessageInput((prev) => ({ ...prev, text: value }));
  };

  return (
    <div style={styles.layout}>
      <div style={styles.header}>
        <div style={styles.chatRoomName}>{chatRoomName}</div>
        <button style={styles.backButton} onClick={() => navigate("/")}>
          채팅방 목록
        </button>
      </div>
      <div style={styles.chatList}>
        <div style={styles.messageContainer}>
          {listChatRoomMessages?.map((message, index) => {
            const { chatUserId, imageKey, imageUrl, text, id } = message;
            const isMe = chatUserId === user.attributes.email;
            const justifyContent = isMe ? "flex-end" : "flex-start";

            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: justifyContent,
                }}
                key={id}
              >
                <div style={{ alignSelf: justifyContent }}>{chatUserId}</div>
                {text && (
                  <div style={isMe ? styles.myMessage : styles.otherMessage}>
                    {text}
                  </div>
                )}

                {imageKey && (
                  <div style={isMe ? styles.myMessage : styles.otherMessage}>
                    <img
                      style={styles.messageImageThumbnail}
                      src={imageUrl}
                      alt="이미지"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div ref={messageEndRef} />
      </div>
      {imgFile.thumbnail && (
        <div style={styles.imagePreviewContainer}>
          <img
            src={imgFile.thumbnail}
            alt="첨부 이미지"
            style={styles.uploadImagePreview}
          />

          <button
            style={styles.deleteImagePreviewButton}
            onClick={handleClickDeletePreviewImg}
          >
            x
          </button>
        </div>
      )}

      <form style={styles.chatInput} onSubmit={handleSubmit}>
        <input
          style={styles.input}
          onChange={handleChangeMessageInput}
          value={messageInput.text}
        />
        <button style={styles.submitButton} type="submit">
          보내기
        </button>
        <label
          style={styles.submitButton}
          htmlFor="image_upload"
          name="image_upload"
        >
          +
        </label>
        <input
          style={{ display: "none" }}
          type="file"
          id="image_upload"
          accept="image/png"
          onChange={handleChangeImageInput}
        />
      </form>
    </div>
  );
}

export default withAuthenticator(ChatRoom);

const styles = {
  layout: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    padding: "10px 0",
    width: "100%",
    maxWidth: 400,
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: "0px 10px",
  },
  chatRoomName: {
    fontSize: "24px",
    fontWeight: "bold",
    padding: "10px",
  },
  backButton: {
    backgroundColor: "#009688",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
  },
  chatList: {
    width: "100%",
    overflowY: "scroll",
    padding: "0 0 0 10px",
    flex: 1,
  },
  chatItem: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
  },
  chatInput: {
    display: "flex",
    width: "100%",
    padding: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    fontSize: "16px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  submitButton: {
    backgroundColor: "#009688",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: "16px",
    marginLeft: "10px",
  },
  imagePreviewContainer: {
    display: "flex",
    height: 200,
    width: "100%",
    objectFit: "contain",
    padding: "15px",
    position: "relative",
  },
  uploadImagePreview: {
    objectFit: "contain",
    width: "100%",
  },

  deleteImagePreviewButton: {
    backgroundColor: "transparent",
    color: "#009688",
    border: "none",
    cursor: "pointer",
    fontSize: "25px",
    position: "absolute",
    right: 0,
    top: 0,
    margin: 5,
  },

  messageContainer: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    flex: 1,
  },
  myMessage: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
    backgroundColor: "#009688",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    alignSelf: "flex-end",
    wordBreak: "break-word",
    overflow: "break-word",
  },
  otherMessage: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "80%",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
    cursor: "pointer",
    alignSelf: "flex-start",
    wordBreak: "break-word",
    overflow: "break-word",
  },
  messageImageThumbnail: {
    width: "100%",
    height: 150,
    objectFit: "contain",
  },
};
