const axios = require("axios");

const public_registry_api = "https://registry.npmjs.org";
const setUri = (packageName, version) => {
  let hasPackageName = false;
  let hasVersion = false;
  if (packageName.length > 0) {
    hasPackageName = true;
  }
  if (version.length > 0) {
    hasVersion = true;
  }
  return `${public_registry_api}${hasPackageName ? "/" + packageName : ""}${
    hasVersion ? "/" + version : ""
  }`;
};
module.exports = {
  getPackage: async (packageName = "", version = "", callback) => {
    try {
      const response = await axios({
        method: "get",
        url: setUri(packageName, version),
        responseType: "json"
      });
      callback(undefined, response);
    } catch (error) {
      callback(
        {
          message: "get request to registry.npmjs.org failed. try again later",
          code: 500,
          error
        },
        undefined
      );
    }
  }
};

// module.exports = class mod {
//   constructor() {
//     this.public_registry_api = "https://registry.npmjs.org";
//   }
//   async getPackage(packageName = "", version = "", callback) {
//     try {
//       const response = await axios({
//         method: "get",
//         url: this.public_registry_api,
//         responseType: "json"
//       });
//       callback(undefined, response);
//     } catch (error) {
//       callback(
//         {
//           message: "get request to registry.npmjs.org failed. try again later",
//           code: 500,
//           error
//         },
//         undefined
//       );
//     }
//   }
// };
//
