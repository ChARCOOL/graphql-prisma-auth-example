import {
  makeSchema,
  nonNull,
  objectType,
  stringArg,
  queryType,
  mutationType,
  arg,
  inputObjectType,
} from 'nexus'
import { nexusPrisma } from 'nexus-plugin-prisma'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import path from 'path'

import { getUserId } from './utils/getUserId'

const Query = queryType({
  definition(t) {
    t.nullable.field('me', {
      type: 'User',
      resolve: async (_parent, _args, ctx) => {
        try {
          const userId = getUserId(ctx)

          return await ctx.prisma.user.findUnique({
            where: {
              id: userId,
            },
          })
        } catch (error) {
          return error
        }
      },
    })
  },
})

const Mutation = mutationType({
  definition(t) {
    t.nonNull.field('createUser', {
      type: 'User',
      args: {
        data: nonNull(
          arg({
            type: 'UserCreateInput',
          }),
        ),
      },
      resolve: async (_parent, args, context) => {
        try {
          const user = await context.prisma.user.create({
            data: {
              username: args.data.username,
              email: args.data.email,
              password: args.data.email,
            },
          })

          return user
        } catch (error) {
          return error
        }
      },
    })

    t.nonNull.field('login', {
      type: 'AuthPayload',
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      resolve: async (_parent, args, context) => {
        try {
          const user = await context.prisma.user.findUnique({
            where: {
              email: args.email,
            },
          })

          const match = await compare(args.password, user!.password)

          if (match) {
            const token = sign(
              {
                id: user!.id,
              },
              process.env.JWT_SECRET!,
              {
                expiresIn: process.env.JWT_EXPIRES_IN!,
              },
            )

            return {
              token,
              user,
            }
          } else {
            throw new Error('Email or password is wrong.')
          }
        } catch (error) {
          return error
        }
      },
    })
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.nonNull.id('id')
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

const UserCreateInput = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.nonNull.string('username')
    t.nonNull.string('email')
    t.nonNull.string('password')
  },
})

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.nonNull.string('token')
    t.nonNull.field('user', { type: 'User' })
  },
})

export const schema = makeSchema({
  types: { Query, Mutation, User, UserCreateInput, AuthPayload },
  plugins: [nexusPrisma()],
  outputs: {
    schema: path.join(process.cwd(), 'schema.graphql'),
    typegen: path.join(process.cwd(), 'src/generated/nexus.ts'),
  },
  contextType: {
    module: require.resolve('../src/context.ts'),
    export: 'Context',
  },
  sourceTypes: {
    modules: [
      {
        module: '@prisma/client',
        alias: 'prisma',
      },
    ],
  },
})
