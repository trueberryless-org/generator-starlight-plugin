"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("@trueberryless-org/generator-ci:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      repositoryName: "generator-ci",
      githubOwner: "trueberryless-org"
    });
  });

  it("creates files", () => {
    assert.file(["LICENSE"]);
  });
});
