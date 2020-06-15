import { dbInstance } from 'dbProvider'

import { Roles } from './roles.types'

export const getOneById = async (id: string): Promise<Roles> => {
  return await dbInstance.findOne({ _id: id})
}

export const create = async (roles: Roles): Promise<Roles> => {
  return await dbInstance.createOne(roles)
}

export const updateProp = async (id: string, propValue: string) => {
  return await dbInstance.updateOne({ _id: id }, { prop: propValue })
}
