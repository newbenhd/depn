const chalk = require("chalk");
const path = require("path");
const fs = require("fs");
class app {
  constructor() {
    this.fileName = "";
    this.src = "";
    this.dest = path.join(process.env.PWD, "/.depn/dest");
    this.depn = {};
    this.initialize();
  }
  initialize() {
    try {
      fs.mkdirSync(this.dest, { recursive: true });
    } catch (e) {
      console.log(e.code);
      throw e;
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
      console.warn(
        chalk.orange.inverse(
          `Key already exists. \n${chalk.white(
            "Choose from following option:\n1. Overwrite\n2. Exist process"
          )}`
        )
      );
    } else {
      this.depn[key] = value;
      console.log(
        chalk.green.inverse(
          `Successfully add ${key} and its value to dependency object!`
        )
      );
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
      return value;
    } else {
      // Check if I want to update or not!
    }
  }
  delete(key) {
    const success = delete this.depn[key];
    if (success) {
      console.log(
        chalk.green.inverse(
          `Successfully removed ${key} from dependency object!`
        )
      );
    } else {
      console.error(
        chalk.red.inverse(
          `Went wrong about delete operation on dependency object! Please check if it's appropriate key.`
        )
      );
    }
  }
}

module.exports = new app();
