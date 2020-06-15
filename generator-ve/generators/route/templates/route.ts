import requestSchema from './<%= schemaName %>.request.json'

export const ctrl = (req) => {
  // TODO: implement controler logic here ...
  return {
    <%= responseProp %>: 'ok'
  }
}
