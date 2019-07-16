/* class:
 *  + constructor: () => ()
 *  + getPackage: (package: string, version: string, callback: fn) => ()
 */

const { expect } = require("chai");
const { getPackage } = require("../registry-api");

describe("Test http request to registry public api", () => {
  describe("Test getPackage", () => {
    describe("with default", () => {
      let thisError = undefined;
      let thisResponse = undefined;
      before(done => {
        getPackage(undefined, undefined, (error, response) => {
          thisError = error;
          thisResponse = response;
          done();
        });
      });
      it("check status", () => {
        expect(thisResponse.status).to.equal(200);
      });
      it("check error", () => {
        expect(thisError).to.be.undefined;
      });
    });
    describe("with existing package", () => {
      let myError = undefined,
        myResponse = undefined;
      before(done => {
        getPackage("express", undefined, (error, response) => {
          myError = error;
          myResponse = response;
          done();
        });
      });
      it("check status", () => {
        expect(myResponse.status).to.equal(200);
      });
      it("check error", () => {
        expect(myError).to.be.undefined;
      });
    });
    describe("with non-existing package", () => {
      let myError = undefined,
        myResponse = undefined;
      before(done => {
        getPackage("asdlkfjlasdjf", undefined, (error, response) => {
          myError = error;
          myResponse = response;
          done();
        });
      });
      it("check status", () => {
        expect(myResponse).to.be.undefined;
      });
      it("check error", () => {
        expect(myError).to.have.property("error");
      });
    });
    describe("with existing package and version", () => {
      let thisError = undefined,
        thisResponse = undefined;
      before(done => {
        getPackage("express", "4.17.1", (error, response) => {
          thisError = error;
          thisResponse = response;
          done();
        });
      });
      it("check status", () => {
        expect(thisResponse.status).to.equal(200);
      });
      it("check status", () => {
        expect(thisError).to.be.undefined;
      });
    });
  });
});
