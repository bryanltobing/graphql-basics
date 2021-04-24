import { GraphQLServer } from 'graphql-yoga'
import uuidv4 from 'uuid/v4'

// Demo user data
let users = [
  {
    id: '1',
    name: 'Andrew',
    email: 'andrew@example.com',
    age: 27,
  },
  {
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com',
  },
  {
    id: '3',
    name: 'Mike',
    email: 'mike@example.com',
  },
]

let posts = [
  {
    id: '10',
    title: 'GraphQL 101',
    body: 'This is how to use graphql...',
    published: true,
    authorId: '1',
  },
  {
    id: '11',
    title: 'Graphql 201',
    body: 'This is an advance graphql course',
    published: false,
    authorId: '1',
  },
  {
    id: '12',
    title: 'How im supposed to do',
    body: "You didn't wanna know",
    published: false,
    authorId: '2',
  },
]

let comments = [
  {
    id: '102',
    text: 'This worked well for me, Thanks',
    authorId: '1',
    postId: '10',
  },
  {
    id: '103',
    text: 'Glad you enjoy it',
    authorId: '2',
    postId: '11',
  },
  {
    id: '104',
    text: 'Nevermind i got it to work',
    authorId: '3',
    postId: '11',
  },
  {
    id: '142',
    text: ' Comment- How im supposed to do',
    authorId: '3',
    postId: '12',
  },
]

// Type defenitions (schema)
const typeDefs = `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
    deleteUser(id: ID!): User!
    createPost(data: CreatePostInput): Post!
    deletePost(id: ID!): Post!
    createComment(data: CreateCommentInput): Comment!
    deleteComment(id: ID!): Comment!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  } 

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }
`

// Resolvers
const resolvers = {
  Query: {
    users(parent, args, context, info) {
      if (!args.query) {
        return users
      }

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
    },
    posts(parent, args, context, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter((post) => {
        const query = args.query.toLowerCase()
        const isTitleMatch = post.title.toLowerCase().includes(query)
        const isBodyMatch = post.body.toLowerCase().includes(query)

        return isTitleMatch || isBodyMatch
      })
    },
    comments(parent, args, context, info) {
      return comments
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
  Mutation: {
    createUser(parent, args, context, info) {
      const emailTaken = users.some((user) => user.email === args.data.email)

      if (emailTaken) {
        throw new Error('Email taken.')
      }

      const user = {
        id: uuidv4(),
        ...args.data,
      }

      users.push(user)

      return user
    },
    deleteUser(parent, args, context, info) {
      const userIndex = users.findIndex((user) => user.id === args.id)

      if (userIndex === -1) {
        throw new Error('User not found')
      }

      const deletedUsers = users.splice(userIndex, 1)

      posts = posts.filter((post) => {
        const match = post.authorId === args.id

        if (match) {
          comments = comments.filter((comment) => comment.postId !== post.id)
        }

        return !match
      })

      comments = comments.filter((comment) => comment.authorId !== args.id)

      return deletedUsers[0]
    },
    createPost(parent, args, ctx, info) {
      const userExists = users.some((user) => user.id === args.data.author)

      if (!userExists) {
        throw new Error('User not found')
      }

      const post = {
        id: uuidv4(),
        ...args.data,
        authorId: args.data.author,
      }

      posts.push(post)

      return post
    },
    deletePost(parent, args, ctx, info) {
      const postIndex = posts.findIndex((post) => post.id === args.id)

      if (postIndex === -1) {
        throw new Error('No post exist')
      }
      // Delete the post
      const deletedPost = posts.splice(postIndex, 1)

      comments = comments.filter((comment) => comment.postId !== args.id)

      return deletedPost[0]
    },
    createComment(parent, args, ctx, info) {
      const userExist = users.some((user) => user.id === args.data.author)
      const postExist = posts.some(
        (post) => post.id === args.data.post && post.published
      )

      if (!userExist || !postExist) {
        throw new Error('User or post might not exist')
      }

      const comment = {
        id: uuidv4(),
        ...args.data,
        authorId: args.data.author,
        postId: args.data.post,
      }
      console.log(comment)

      comments.push(comment)

      return comment
    },
    deleteComment(parent, args, context, info) {
      const commentIndex = comments.findIndex(
        (comment) => comment.id === args.id
      )

      if (commentIndex === -1) {
        throw new Error('No comment found')
      }

      // delete comment
      const deletedComment = comments.splice(commentIndex, 1)
      return deletedComment[0]
    },
  },
  Post: {
    author(parent, args, context, info) {
      return users.find((user) => user.id === parent.authorId)
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => comment.postId === parent.id)
    },
  },
  User: {
    posts(parent, args, context, info) {
      return posts.filter((post) => {
        return post.authorId === parent.id
      })
    },
    comments(parent, args, context, info) {
      return comments.filter((comment) => {
        return comment.authorId === parent.id
      })
    },
  },
  Comment: {
    author(parent, args, context, info) {
      const parentAuthorId = parent.authorId
      return users.find((user) => user.id === parentAuthorId)
    },
    post(parent, args, context, info) {
      const parentPostId = parent.postId
      return posts.find((post) => post.id === parentPostId)
    },
  },
}

const server = new GraphQLServer({ typeDefs, resolvers })

server.start(() => {
  console.log('Server is running on localhost:4000')
})
