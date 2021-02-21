import { verify } from 'jsonwebtoken'
import { Context } from '../context'

interface Token {
  id: number
  iat: number
  exp: number
}

export const getUserId = (context: Context) => {
  const Authorization = context.req.get('Authorization')

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '')

    const { id } = verify(token, process.env.JWT_SECRET!) as Token

    return id
  }
}
