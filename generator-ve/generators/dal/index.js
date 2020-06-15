const Generator = require('yeoman-generator')
const { camelCase, paramCase, pascalCase } = require('change-case')

module.exports = class extends Generator {
  props = {}

  constructor(args, opts) {
    super(args, opts)
    this.props = opts
  }

  async prompting() {
    let prompts = []

    if (!this.props.domainName) {
      prompts.push({
        name: 'domainName',
        type: 'input',
        message: 'domain name'
      })
    }

    prompts = [
      ...prompts,
      {
        name: 'dalName',
        type: 'input',
        message: 'dal name'
      },
      {
        name: 'collectionIndex',
        type: 'list',
        choices: ['_id', 'id']
      },
      {
        name: 'collectionIndexType',
        type: 'list',
        choices: ['string', 'number']
      }
    ]

    this.answers = await this.prompt(prompts)
  }

  writing() {
    const domainName = this.props.domainName || this.answers.domainName

    this.fs.copyTpl(
      this.templatePath('dal.ts'),
      this.destinationPath(
        `src/domains/${paramCase(domainName)}/dal/${paramCase(
          this.answers.dalName
        )}.dal.ts`
      ),
      {
        collectionType: pascalCase(this.answers.dalName),
        collectionIndex: this.answers.collectionIndex,
        collectionIndexType: this.answers.collectionIndexType,
        createInput: camelCase(this.answers.dalName),
        createInputType: pascalCase(this.answers.dalName),
        dalName: paramCase(this.answers.dalName)
      }
    )
  }
}
