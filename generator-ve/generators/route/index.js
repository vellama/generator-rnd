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
      this.templatePath('route.request.json'),
      this.destinationPath(
        `src/routes/${paramCase(this.answers.routeName)}/${paramCase(
          this.answers.routeName
        )}.request.json`
      ),
      {
        schemaName: paramCase(this.answers.routeName),
        schemaTitle: noCase(this.answers.routeName),
        propName: camelCase(this.answers.routeName)
      }
    )

    this.fs.copyTpl(
      this.templatePath('route.ts'),
      this.destinationPath(
        `src/routes/${paramCase(this.answers.routeName)}/${paramCase(
          this.answers.routeName
        )}.ts`
      ),
      {
        schemaName: paramCase(this.answers.routeName),
        responseProp: camelCase(this.answers.routeName)
      }
    )

    this.fs.copyTpl(
      this.templatePath('route.types.ts'),
      this.destinationPath(
        `src/routes/${paramCase(this.answers.routeName)}/${paramCase(
          this.answers.routeName
        )}.types.ts`
      ),
      {
        requestProp: camelCase(this.answers.routeName),
        responseProp: camelCase(this.answers.routeName)
      }
    )
  }
}
