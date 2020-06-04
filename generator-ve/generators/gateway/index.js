const Generator = require('yeoman-generator')

const TSGenerator = require('../typescript/index')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)

    this.argument('appname', { type: String, required: false })
  }

  initializing() {
    this.composeWith({
      Generator: TSGenerator,
      path: require.resolve('../typescript')
    })
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        name: 'appName',
        type: 'input',
        message: 'app name',
        default: this.appname
      }
    ])
  }

  writing() {
    this.log('appName', this.answers.appName)
  }
}
