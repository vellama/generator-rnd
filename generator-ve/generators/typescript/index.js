var Generator = require('yeoman-generator')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        name: 'useTS',
        type: 'confirm',
        message: 'use typescript ?',
        default: true
      }
    ])
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json')
    )
  }

  install() {
    if (this.answers.useTS) {
      this.yarnInstall(['typescript'], { dev: true, exact: true })
      this.yarnInstall(['ts-node-dev'], { dev: true, exact: true })
    }
  }
}
