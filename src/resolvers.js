module.exports = {
  Query: {
    chats: (_, __, { dataSources }) => dataSources.chatAPI.getAllChats(),
    chatsFrom: (_, { from }, { dataSources }) =>
      dataSources.chatAPI.getChatsByFrom({ from })
  },
  Mutation: {
    createChat: async (_, { from, content }, { dataSources }) => {
      const chat = await dataSources.chatAPI.createChat({
        from,
        content
      });
      return {
        success: chat !== null && chat !== undefined,
        message: chat !== null && chat !== undefined
          ? "chat created successfully"
          : "chat not created successfully"
      };
    }
  }
};
