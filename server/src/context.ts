import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

prisma.$use(async (params, next) => {
  const result = await next(params)

  if (params.action === 'create' && params.model === 'User') {
    params.args.data.password = await hash(params.args.data.password, 10)
  }

  return result
})

export interface Context {
  prisma: PrismaClient
  req: any
}

export const createContext = (req: Context) => ({
  ...req,
  prisma,
})
