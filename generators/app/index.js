"use strict";
const Generator = require("yeoman-generator");
const yosay = require("yosay");

module.exports = class extends Generator {
  initializing() {
    this.log(
      yosay(`Welcome to the @trueberryless-org/generator-ci generator!`)
    );
  }

  prompting() {
    const prompts = [
      {
        type: "input",
        name: "repository-name",
        message: "What is the name of the repository?",
        default: this.appname
      },
      {
        type: "input",
        name: "github-owner",
        message: "What is your GitHub username or organization?",
        default: "trueberryless-org"
      },
      {
        type: "input",
        name: "docker-owner",
        message: "What is your Docker username or organization?",
        default: "trueberryless"
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath("LICENSE"),
      this.destinationPath("LICENSE"),
      {
        year: new Date().getFullYear(),
        githubOwner: this.props.githubOwner
      }
    );
  }

  install() {
    this.env.options.nodePackageManager = "pnpm";
    this.installDependencies();
  }

  end() {
    this.log("Done!");
  }
};
