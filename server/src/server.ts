import { ApolloServer } from 'apollo-server'
import { config } from 'dotenv'

config({ path: '.env' })

import { schema } from './schema'
import { createContext } from './context'

const server = new ApolloServer({
  schema,
  context: createContext,
})

server
  .listen()
  .then((server) => console.log(`Listening on port: ${server.port}`))
  .catch((reason) => console.error(reason))
