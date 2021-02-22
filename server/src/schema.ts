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
import { sign, verify } from 'jsonwebtoken'
import { hash, compare } from 'bcryptjs'
import path from 'path'

import { getUserId } from './utils/getUserId'

const Query = queryType({
  definition(t) {
    t.nonNull.field('me', {
      type: 'User',
      resolve: async (_parent, _args, context) => {
        try {
          const userId = getUserId(context)

          return await context.prisma.user.findUnique({
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
              password: await hash(args.data.password, 10),
              refreshToken: '',
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
            where: { email: args.email },
          })

          if (!user) throw new Error("Account doesn't exists!")

          const match = await compare(args.password, user!.password)

          if (!match) throw new Error('Email or password is wrong!')

          const accessToken = sign(
            { id: user.id },
            process.env.JWT_ACCESS_SECRET!,
            { expiresIn: '20s' },
          )

          const refreshToken = sign(
            { id: user.id },
            process.env.JWT_REFRESH_SECRET!,
            { expiresIn: '7d' },
          )

          return {
            accessToken,
            user: await context.prisma.user.update({
              where: { email: args.email },
              data: { refreshToken },
            }),
          }
        } catch (error) {
          return error
        }
      },
    })

    t.nonNull.field('renewAccessToken', {
      type: 'AccessToken',
      args: {
        token: nonNull(stringArg()),
      },
      resolve: (_parent, args, context) => {
        try {
          return verify(
            args.token,
            process.env.JWT_REFRESH_SECRET!,
            async (err, user: any) => {
              const tokenExists = await context.prisma.user.findFirst({
                where: { refreshToken: args.token },
              })

              if (!tokenExists) {
                throw new Error('User not authenticated!')
              }

              if (err) {
                throw new Error('User not authenticated!')
              }

              const accessToken = sign(
                { id: user!.id },
                process.env.JWT_ACCESS_SECRET!,
                { expiresIn: '20s' },
              )

              return { accessToken }
            },
          )
        } catch (err) {
          return err
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
    t.string('refreshToken')
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
    t.nonNull.string('accessToken')
    t.nonNull.field('user', { type: 'User' })
  },
})

const AccessToken = objectType({
  name: 'AccessToken',
  definition(t) {
    t.nonNull.string('accessToken')
  },
})

export const schema = makeSchema({
  types: {
    Query,
    Mutation,
    User,
    UserCreateInput,
    AuthPayload,
    AccessToken,
  },
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
