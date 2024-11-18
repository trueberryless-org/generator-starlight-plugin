"use strict";
import path from "path";
import assert from "yeoman-assert";
import helpers from "yeoman-test";

describe("@trueberryless-org/generator-starlight-plugin:app", () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      repositoryName: "generator-starlight-plugin",
      githubOwner: "trueberryless-org",
      dockerOwner: "trueberryless"
    });
  });

  it("creates files", () => {
    assert.file(["LICENSE"]);
    assert.file(["package.json"]);
    assert.file([
      ".github/workflows/welcome-bot.yaml",
      ".github/workflows/release.yaml"
    ]);

    assert.fileContent();
  });
});
