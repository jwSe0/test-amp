/* src/RoomList.js */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import * as mutations from "./graphql/mutations";
import * as queries from "./graphql/queries";
import * as subscriptions from "./graphql/subscriptions";

const RoomList = ({ signOut, user }) => {
  const navigate = useNavigate();
  const [roomName, setRoomName] = useState("");
  const [listChatRooms, setListChatRooms] = useState([]);

  // 채팅방 리스트 받아오기
  const fetchListChatRooms = async () => {
    try {
      const {
        data: {
          listChatRooms: { items },
        },
      } = await API.graphql({
        query: queries.listChatRooms,
      });

      // 생성된 순으로 정렬
      const sortedChatRoomsByCreatedAt = items?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setListChatRooms(sortedChatRoomsByCreatedAt);
    } catch (error) {
      console.log("listChatRooms", error);
    }
  };

  useEffect(() => {
    fetchListChatRooms();
  }, []);

  // 채팅방 생성을 구독
  useEffect(() => {
    const subOnCreateChatRoom = () => {
      return API.graphql(
        graphqlOperation(subscriptions.onCreateChatRoom)
      ).subscribe({
        next: () => {
          fetchListChatRooms();
        },
        error: (error) => console.log(error),
      });
    };

    const subCreateChatRoom = subOnCreateChatRoom();
    return () => {
      subCreateChatRoom.unsubscribe();
    };
  }, []);

  // 새 채팅방 만들기
  const createNewChatRoom = async () => {
    try {
      const res = await API.graphql({
        query: mutations.createChatRoom,
        variables: { input: { name: roomName } },
      });

      console.log("createNewChatRoom", res);
    } catch (error) {
      console.log("createNewChatRoom", error);
    }
  };

  // 채팅방 삭제
  const deleteChatRoom = async (roomId) => {
    try {
      const res = await API.graphql({
        query: mutations.deleteChatRoom,
        variables: { input: { id: roomId } },
      });

      console.log("deleteChatRoom", res);
      fetchListChatRooms();
    } catch (error) {
      console.log("deleteChatRoom", error);
    }
  };

  // 방만들기 클릭시
  const handleSubmit = (e) => {
    e.preventDefault();

    if (roomName.trim().length === 0) {
      return alert("방 이름을 작성 바랍니다.");
    }

    createNewChatRoom();
    fetchListChatRooms();
    setRoomName("");
  };

  // 채팅방으로 이동
  const handleClickChatRoom = (roomId, roomName) => {
    navigate(`/${roomId}/${roomName}`);
  };

  return (
    <div style={styles.layout}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputContainer}>
          <input
            style={styles.input}
            onChange={(e) => setRoomName(e.target.value)}
            value={roomName}
            placeholder="방 이름을 입력하세요"
          />
          <button style={styles.submitButton} type="submit">
            방만들기
          </button>
        </div>
      </form>

      <div style={styles.chatRoomList}>
        {listChatRooms?.map((room) => (
          <div key={room.id} style={styles.chatRoomItem}>
            <span onClick={() => handleClickChatRoom(room.id, room.name)}>
              {room.name}
            </span>
            <button
              style={styles.deleteButton}
              onClick={() => deleteChatRoom(room.id)}
            >
              삭제
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default withAuthenticator(RoomList);

const styles = {
  layout: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: "0 auto",
    padding: "20px 0",
    width: 400,
    height: "100vh",
    backgroundColor: "#f7f7f7",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0 10px",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginBottom: "10px",
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
  chatRoomList: {
    width: "100%",
    overflow: "scroll",
    paddingLeft: "10px",
  },
  chatRoomItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "10px",
  },
  deleteButton: {
    backgroundColor: "#FF6347",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 15px",
    cursor: "pointer",
    fontSize: "14px",
  },
};
