/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getChatRoom = /* GraphQL */ `
  query GetChatRoom($id: ID!) {
    getChatRoom(id: $id) {
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
export const listChatRooms = /* GraphQL */ `
  query ListChatRooms(
    $filter: ModelChatRoomFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatRooms(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const getMessage = /* GraphQL */ `
  query GetMessage($id: ID!) {
    getMessage(id: $id) {
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
export const listMessages = /* GraphQL */ `
  query ListMessages(
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        text
        chatRoomId
        chatRoom {
          id
          name
          createdAt
          updatedAt
          __typename
        }
        chatUserId
        chatUser {
          id
          email
          username
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
      nextToken
      __typename
    }
  }
`;
export const getChatUser = /* GraphQL */ `
  query GetChatUser($id: ID!) {
    getChatUser(id: $id) {
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
export const listChatUsers = /* GraphQL */ `
  query ListChatUsers(
    $filter: ModelChatUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listChatUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      __typename
    }
  }
`;
export const messagesByDate = /* GraphQL */ `
  query MessagesByDate(
    $chatRoomId: ID!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelMessageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    messagesByDate(
      chatRoomId: $chatRoomId
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
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
  }
`;
