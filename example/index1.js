import { GraphQLServer } from 'graphql-yoga'

// Type defenitions (schema)
const typeDefs = `
  type Query {
    greeting(name: String, position: String): String!
    add(numbers: [Float!]!): Float!
    grades: [Int!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
  }
`

// Resolvers
const resolvers = {
  Query: {
    greeting(parent, args) {
      if (args.name && args.position) {
        return `Hello ${args.name}! You are my favorite ${args.position}`
      }

      return 'Hello!'
    },
    add(parent, args) {
      if (args.numbers.length === 0) {
        return 0
      }

      // [1, 5, 10, 2]
      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue
      })
    },
    grades(parent, args, context, info) {
      return [99, 80, 93]
    },
    me() {
      return {
        id: 'abc123',
        name: 'Bryan Lumbantobing',
        email: 'bryantobing0@gmail.com',
        age: 19,
      }
    },
    post() {
      return {
        id: 'post1',
        title: 'The War of Art',
        body: 'Nice book',
        published: false,
      }
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('Server is running on localhost:4000')
})
