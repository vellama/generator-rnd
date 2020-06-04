const Generator = require('yeoman-generator')
const { camelCase, noCase, paramCase } = require('change-case')

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        name: 'routeName',
        type: 'input',
        message: 'route name'
      }
    ])
  }

  writing() {
    this.fs.copyTpl(
      this.templatePath('request.schema.json'),
      this.destinationPath(
        `routes/${this.answers.routeName}/request.schema.json`
      ),
      {
        schemaName: paramCase(this.answers.routeName),
        schemaTitle: noCase(this.answers.routeName),
        propName: camelCase(this.answers.routeName)
      }
    )
  }
}
