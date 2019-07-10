const app = require("./index");
const moment = require("moment");
const { expect, assert } = require("chai");

describe("Data stored correctly", () => {
  const date = moment().format("MM-DD-YYYY");
  const src = `./depn-test-${date}/src`;
  const dest = `./depn-test-${date}/dest`;
  const fileName = `default.json`;
  describe("app.initialize()", () => {
    it("Should throw an error when src not exists", () => {
      expect(() => app.initialize(src, dest, fileName)).to.throw(Error);
    });
    app.initialize(undefined, dest, fileName);
    it("Expect app.src to equal app.dest if src argument's not given", () => {
      expect(app.src).to.equal(app.dest);
    });
    it("Expect app.dest to equal ./depn-test-${date}/dest", () => {
      expect(app.dest).to.equal(dest);
    });
    it("Expect app.fileName to equal default.json", () => {
      expect(app.fileName).to.equal("default.json");
    });
  });
  describe("app.create()", () => {
    const obj = {};
    obj[`module-${date}-1`] = {
      name: `module-${date}-1`,
      body: "some body"
    };
    it("Expect the app.depn has new module key and value after app.create", () => {
      app.create(`module-${date}-1`, obj[`module-${date}-1`]);
      expect(app.depn).to.have.ownProperty(`module-${date}-1`);
    });
  });
  describe("app.delete()", () => {
    it("Expect the app.depn not have module key after app.delete", () => {
      app.delete(`module-${date}-1`);
      expect(app.depn).to.not.have.ownProperty(`module-${date}-1`);
    });
  });

  describe("app.clear()", () => {});
});
