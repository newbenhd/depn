const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
class app {
  constructor() {
    this.fileName = "";
    this.src = "";
    this.dest = "";
    this.depn = {};
  }
  initialize(
    src = "",
    dest = path.join(process.env.PWD, "/.depn/dest"),
    fileName = "default.json"
  ) {
    this.fileName = fileName;
    this.dest = dest;
    if (src === "") {
      this.src = this.dest;
    } else {
      if (fs.existsSync(src)) {
        this.src = src;
      } else {
        throw new Error("Directory does not exists!");
      }
    }

    try {
      fs.mkdirSync(this.dest, { recursive: true });
    } catch (error) {
      throw error;
    }
    if (!fs.existsSync(path.join(this.src, this.fileName))) {
      fs.writeFileSync(path.join(this.src, this.fileName), JSON.stringify({}));
    }
    try {
      const stringJson = fs.readFileSync(path.join(this.src, this.fileName), {
        encoding: "utf-8"
      });
      this.depn = JSON.parse(stringJson);
    } catch (error) {
      if (error.code === "ENOENT") {
        this.newFile(this.src, this.fileName, JSON.stringify({}));
      }
    }
  }
  newFile(src, fileName, data) {
    try {
      fs.writeFileSync(path.join(src, fileName), data);
    } catch (error) {
      throw error;
    }
  }
  setFileName(fileName) {
    this.fileName = fileName;
  }
  setSrc(src) {
    this.src = src;
  }
  setDest(dest) {
    this.dest = dest;
  }
  clear() {
    this.depn = {};
    this.write();
  }
  write() {
    return new Promise((resolve, reject) => {
      const depnString = JSON.stringify(this.depn);
      fs.writeFile(path.join(this.dest, this.fileName), depnString, err => {
        if (err) reject(err);
      });
    });
  }
  create(key, value) {
    if (this.depn.hasOwnProperty(key)) {
      // console.warn(
      //   chalk.orange.inverse(
      //     `Key already exists. \n${chalk.white(
      //       "Choose from following option:\n1. Overwrite\n2. Exist process"
      //     )}`
      //   )
      // );
      return false;
    } else {
      this.depn[key] = value;
      // console.log(
      //   chalk.green.inverse(
      //     `Successfully add ${key} and its value to dependency object!`
      //   )
      // );
      return true;
    }
  }
  list() {
    let i = 1;
    for (let key in this.depn) {
      console.log(`${i}. ${key}`);
    }
    return this.depn;
  }
  read(key) {
    if (this.depn.hasOwnProperty(key)) {
      // console.log(this.depn[key])
      return this.depn[key];
    } else {
      // console.error(chalk.red.inverse(`[Fail] ${key} does not exists!`))
      return undefined;
    }
  }
  update(key, value) {
    if (this.depn.hasOwnProperty(key)) {
      this.depn[key] = value;
      return true;
    } else {
      // Check if I want to update or not!
      return false;
    }
  }
  delete(key) {
    const success = delete this.depn[key];
    if (success) {
      // console.log(
      //   chalk.green.inverse(
      //     `Successfully removed ${key} from dependency object!`
      //   )
      // );
    } else {
      // console.error(
      //   chalk.red.inverse(
      //     `Went wrong about delete operation on dependency object! Please check if it's appropriate key.`
      //   )
      // );
    }
    return success;
  }
}

module.exports = new app();
