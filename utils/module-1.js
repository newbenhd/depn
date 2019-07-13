const axios = require("axios");

module.exports = class mod {
  constructor() {
    this.public_registry_api = "https://registry.npmjs.org";
  }
  async getPackage(package = "", version = "", callback) {
    try {
      const response = await axios({
        method: "get",
        url: this.public_registry_api,
        responseType: "json"
      })
      callback(undefined, response)
    } catch (error) {
      callback({message: "get request to registry.npmjs.org failed. try again later", code: 500, error}, undefined)
    }
  }
}