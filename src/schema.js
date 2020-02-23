const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    chats: [Chat]
    chatsFrom(from: String!): [Chat]
  }

  type Mutation {
    createChat(from: String!, content: String!): ChatResponse!
  }

  type ChatResponse {
    success: Boolean!,
    message: String
  }

  type Chat {
    id: ID!
    from: String!
    content: String!
    createdAt: String!
  }
`;

module.exports = typeDefs;