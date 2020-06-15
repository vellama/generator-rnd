import { dbInstance } from 'dbProvider'

import { <%= collectionType %> } from './<%= dalName %>.types'

export const getOneById = async (id: <%= collectionIndexType %>): Promise<<%= collectionType %>> => {
  return await dbInstance.findOne({ <%= collectionIndex %>: id})
}

export const create = async (<%= createInput %>: <%= createInputType %>): Promise<<%= collectionType %>> => {
  return await dbInstance.createOne(<%= createInput %>)
}

export const updateProp = async (id: <%= collectionIndexType %>, propValue: string) => {
  return await dbInstance.updateOne({ <%= collectionIndex %>: id }, { prop: propValue })
}
