"use strict";
import Generator from "yeoman-generator";
import yosay from "yosay";
import camelCase from "camelcase";

export default class StarlightPluginGenerator extends Generator {
  initializing() {
    this.log(
      yosay(
        `Welcome to the @trueberryless-org/generator-starlight-plugin generator!`
      )
    );
  }

  prompting() {
    const prompts = [
      {
        type: "input",
        name: "repositoryName",
        message: "What is the name of the your Starlight plugin?",
        default: this.appname
      },
      {
        type: "input",
        name: "githubOwner",
        message: "What is your GitHub username or organization?",
        default: "trueberryless-org"
      },
      {
        type: "input",
        name: "defaultBranch",
        message: "What is the default branch?",
        default: "main"
      },
      {
        type: "input",
        name: "dockerRegistry",
        message: "To which Docker registry should the image be pushed?",
        default: "docker.io"
      },
      {
        type: "input",
        name: "dockerOwner",
        message:
          "What is the Docker username or organization the image should be pushed to?",
        default: "trueberryless"
      },
      {
        type: "input",
        name: "description",
        message: "What is the description of your Starlight plugin?"
      },
      {
        type: "input",
        name: "documentationFolder",
        message: "In which directory is your documentation?"
      }
    ];

    return this.prompt(prompts).then(props => {
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

    this.fs.copyTpl(
      this.templatePath(".changeset/config.json"),
      this.destinationPath(".changeset/config.json"),
      {
        githubOwner: this.props.githubOwner,
        repositoryName: this.props.repositoryName
      }
    );
    this.fs.copy(
      this.templatePath(".changeset/README.md"),
      this.destinationPath(".changeset/README.md")
    );

    this.fs.copyTpl(
      this.templatePath(".github/workflows"),
      this.destinationPath(".github/workflows"),
      {
        defaultBranch: this.props.defaultBranch,
        dockerRegistry: this.props.dockerRegistry,
        dockerOwner: this.props.dockerOwner,
        repositoryName: this.props.repositoryName,
        githubOwner: this.props.githubOwner,
        documentationFolder: this.props.documentationFolder
      }
    );

    {
      const pkgPath = this.destinationPath("package.json");

      if (!this.fs.exists(pkgPath)) {
        this.fs.copyTpl(this.templatePath("package.json"), pkgPath, {
          repositoryName: this.props.repositoryName,
          githubOwner: this.props.githubOwner,
          description: this.props.description
        });
      }

      const pkg = this.fs.readJSON(pkgPath, {});

      pkg.scripts = {
        ...pkg.scripts,
        version: "pnpm changeset version && pnpm i --no-frozen-lockfile"
      };

      this.fs.writeJSON(pkgPath, pkg);
    }

    {
      const pluginPath = `packages/${this.props.repositoryName}`;

      this.fs.copyTpl(
        this.templatePath("packages/plugin"),
        this.destinationPath(pluginPath),
        {
          repositoryName: this.props.repositoryName,
          githubOwner: this.props.githubOwner,
          documentationFolder: this.props.documentationFolder,
          importName: camelCase(this.props.repositoryName)
        }
      );
    }

    {
      const docsPath = `${this.props.documentationFolder}`;

      if (!this.fs.exists(this.destinationPath(docsPath))) {
        this.fs.copyTpl(
          this.templatePath("docs"),
          this.destinationPath(docsPath),
          {
            repositoryName: this.props.repositoryName,
            githubOwner: this.props.githubOwner,
            importName: camelCase(this.props.repositoryName)
          }
        );
      }
    }

    this.fs.copy(this.templatePath(".vscode"), this.destinationPath(".vscode"));
  }

  install() {
    this.env.options.nodePackageManager = "pnpm";
    this.installDependencies();
  }

  end() {
    this.log("Done!");
  }
}
