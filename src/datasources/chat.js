const { DataSource } = require('apollo-datasource');

class ChatAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  // leaving this inside the class to make the class easier to test
  chatReducer(chat) {
    return {
      id: chat.id || 0,
      from: chat.from || "Nobody",
      content: chat.content || "Nothing",
      createdAt: chat.createdAt || "Never"
    };
  }

  async getAllChats() {
    const response = await this.store.chats.findAll();

    // transform the raw chats to a more friendly
    return Array.isArray(response)
      ? response.map(chat => this.chatReducer(chat))
      : [];
  }

  async getChatByFrom({ from }) {
    const res = await this.store.chats.findAll({
      where: { from: from }
    });
    return this.chatReducer(res[0]);
  }

  async getChatsByFrom({ from }) {
    const res = await this.store.chats.findAll({
      where: { from: from }
    });
    return res.map(chat => this.chatReducer(chat));
  }

  async createChat({ from, content }) {
    const res = await this.store.chats.findOrCreate({
      where: { from, content },
    });
    return res && res.length ? res[0].get() : false;
  }
}

module.exports = ChatAPI;
