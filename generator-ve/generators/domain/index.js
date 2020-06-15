const Generator = require('yeoman-generator')

module.exports = class extends Generator {
  props = {}

  constructor(args, opts) {
    super(args, opts)
    this.props = opts
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        name: 'domainName',
        type: 'input',
        message: 'domain name'
      }
    ])
  }

  default() {
    this.composeWith(require.resolve('../dal/index'), {
      domainName: this.answers.domainName
    })
  }
}
