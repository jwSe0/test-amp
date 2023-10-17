/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createChatRoom = /* GraphQL */ `
  mutation CreateChatRoom(
    $input: CreateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    createChatRoom(input: $input, condition: $condition) {
      id
      name
      messages {
        items {
          id
          text
          chatRoomId
          chatUserId
          createdAt
          imageKey
          updatedAt
          chatRoomMessagesId
          chatUserMessagesId
          __typename
        }
        nextToken
        __typename
      }
      chatUsers {
        items {
          id
          email
          username
          createdAt
          updatedAt
          chatRoomChatUsersId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateChatRoom = /* GraphQL */ `
  mutation UpdateChatRoom(
    $input: UpdateChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    updateChatRoom(input: $input, condition: $condition) {
      id
      name
      messages {
        items {
          id
          text
          chatRoomId
          chatUserId
          createdAt
          imageKey
          updatedAt
          chatRoomMessagesId
          chatUserMessagesId
          __typename
        }
        nextToken
        __typename
      }
      chatUsers {
        items {
          id
          email
          username
          createdAt
          updatedAt
          chatRoomChatUsersId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteChatRoom = /* GraphQL */ `
  mutation DeleteChatRoom(
    $input: DeleteChatRoomInput!
    $condition: ModelChatRoomConditionInput
  ) {
    deleteChatRoom(input: $input, condition: $condition) {
      id
      name
      messages {
        items {
          id
          text
          chatRoomId
          chatUserId
          createdAt
          imageKey
          updatedAt
          chatRoomMessagesId
          chatUserMessagesId
          __typename
        }
        nextToken
        __typename
      }
      chatUsers {
        items {
          id
          email
          username
          createdAt
          updatedAt
          chatRoomChatUsersId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createMessage = /* GraphQL */ `
  mutation CreateMessage(
    $input: CreateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    createMessage(input: $input, condition: $condition) {
      id
      text
      chatRoomId
      chatUserId
      createdAt
      imageKey
      updatedAt
      __typename
    }
  }
`;
export const updateMessage = /* GraphQL */ `
  mutation UpdateMessage(
    $input: UpdateMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    updateMessage(input: $input, condition: $condition) {
      id
      text
      chatRoomId
      chatRoom {
        id
        name
        messages {
          nextToken
          __typename
        }
        chatUsers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      chatUserId
      chatUser {
        id
        email
        username
        messages {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        chatRoomChatUsersId
        __typename
      }
      createdAt
      imageKey
      updatedAt
      chatRoomMessagesId
      chatUserMessagesId
      __typename
    }
  }
`;
export const deleteMessage = /* GraphQL */ `
  mutation DeleteMessage(
    $input: DeleteMessageInput!
    $condition: ModelMessageConditionInput
  ) {
    deleteMessage(input: $input, condition: $condition) {
      id
      text
      chatRoomId
      chatRoom {
        id
        name
        messages {
          nextToken
          __typename
        }
        chatUsers {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        __typename
      }
      chatUserId
      chatUser {
        id
        email
        username
        messages {
          nextToken
          __typename
        }
        createdAt
        updatedAt
        chatRoomChatUsersId
        __typename
      }
      createdAt
      imageKey
      updatedAt
      chatRoomMessagesId
      chatUserMessagesId
      __typename
    }
  }
`;
export const createChatUser = /* GraphQL */ `
  mutation CreateChatUser(
    $input: CreateChatUserInput!
    $condition: ModelChatUserConditionInput
  ) {
    createChatUser(input: $input, condition: $condition) {
      id
      email
      username
      messages {
        items {
          id
          text
          chatRoomId
          chatUserId
          createdAt
          imageKey
          updatedAt
          chatRoomMessagesId
          chatUserMessagesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      chatRoomChatUsersId
      __typename
    }
  }
`;
export const updateChatUser = /* GraphQL */ `
  mutation UpdateChatUser(
    $input: UpdateChatUserInput!
    $condition: ModelChatUserConditionInput
  ) {
    updateChatUser(input: $input, condition: $condition) {
      id
      email
      username
      messages {
        items {
          id
          text
          chatRoomId
          chatUserId
          createdAt
          imageKey
          updatedAt
          chatRoomMessagesId
          chatUserMessagesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      chatRoomChatUsersId
      __typename
    }
  }
`;
export const deleteChatUser = /* GraphQL */ `
  mutation DeleteChatUser(
    $input: DeleteChatUserInput!
    $condition: ModelChatUserConditionInput
  ) {
    deleteChatUser(input: $input, condition: $condition) {
      id
      email
      username
      messages {
        items {
          id
          text
          chatRoomId
          chatUserId
          createdAt
          imageKey
          updatedAt
          chatRoomMessagesId
          chatUserMessagesId
          __typename
        }
        nextToken
        __typename
      }
      createdAt
      updatedAt
      chatRoomChatUsersId
      __typename
    }
  }
`;
