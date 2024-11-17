"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("@trueberryless-org/generator-starlight-plugin:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      repositoryName: "generator-starlight-plugin",
      githubOwner: "trueberryless-org",
      dockerOwner: "trueberryless",
    });
  });

  it("creates files", () => {
    assert.file(["LICENSE"]);
    assert.file(["package.json"]);
    assert.file([
      ".github/workflows/welcome-bot.yaml",
      ".github/workflows/release.yaml",
    ]);

    assert.fileContent();
  });
});
