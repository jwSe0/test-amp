/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateChatRoom = /* GraphQL */ `
  subscription OnCreateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onCreateChatRoom(filter: $filter) {
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
export const onUpdateChatRoom = /* GraphQL */ `
  subscription OnUpdateChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onUpdateChatRoom(filter: $filter) {
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
export const onDeleteChatRoom = /* GraphQL */ `
  subscription OnDeleteChatRoom($filter: ModelSubscriptionChatRoomFilterInput) {
    onDeleteChatRoom(filter: $filter) {
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
export const onCreateMessage = /* GraphQL */ `
  subscription OnCreateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onCreateMessage(filter: $filter) {
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
export const onUpdateMessage = /* GraphQL */ `
  subscription OnUpdateMessage($filter: ModelSubscriptionMessageFilterInput) {
    onUpdateMessage(filter: $filter) {
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
export const onDeleteMessage = /* GraphQL */ `
  subscription OnDeleteMessage($filter: ModelSubscriptionMessageFilterInput) {
    onDeleteMessage(filter: $filter) {
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
export const onCreateChatUser = /* GraphQL */ `
  subscription OnCreateChatUser($filter: ModelSubscriptionChatUserFilterInput) {
    onCreateChatUser(filter: $filter) {
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
export const onUpdateChatUser = /* GraphQL */ `
  subscription OnUpdateChatUser($filter: ModelSubscriptionChatUserFilterInput) {
    onUpdateChatUser(filter: $filter) {
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
export const onDeleteChatUser = /* GraphQL */ `
  subscription OnDeleteChatUser($filter: ModelSubscriptionChatUserFilterInput) {
    onDeleteChatUser(filter: $filter) {
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
