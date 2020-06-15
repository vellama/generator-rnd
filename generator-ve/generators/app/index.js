const Generator = require('yeoman-generator')
const { paramCase } = require('change-case')

const RouteGenerator = require('../route/index')
const TSGenerator = require('../typescript/index')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('appname', { type: String, required: false })
  }

  initializing() {}

  async prompting() {
    this.answers = await this.prompt([
      {
        name: 'appName',
        type: 'input',
        message: 'app name',
        default: this.appname
      },
      {
        name: 'appDescription',
        type: 'input',
        message: 'app description',
        default: ''
      },
      {
        name: 'nodeVersion',
        type: 'list',
        message: 'node version',
        choices: ['12.18.0']
      }
    ])
  }

  default() {
    this.composeWith({
      Generator: TSGenerator,
      path: require.resolve('../typescript')
    })
    this.composeWith(
      {
        Generator: RouteGenerator,
        path: require.resolve('../route')
      },
      {
        appName: this.answers.appName
      }
    )
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('.nvmrc'),
      this.destinationPath('.nvmrc'),
      {
        nodeVersion: this.answers.nodeVersion
      }
    )
    this.fs.copyTpl(this.templatePath('.env'), this.destinationPath('.env'))
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        appName: paramCase(this.answers.appName),
        appDescription: this.answers.appDescription
      }
    )
    this.fs.copyTpl(
      this.templatePath('index.ts'),
      this.destinationPath('src/index.ts')
    )
  }

  install() {
    this.yarnInstall(['dotenv'], { dev: false, exact: true })
  }
}
