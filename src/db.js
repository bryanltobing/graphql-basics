const users = [
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

const posts = [
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

const comments = [
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

const db = { users, posts, comments }

export { db as default }
