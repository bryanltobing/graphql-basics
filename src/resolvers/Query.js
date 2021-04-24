const Query = {
  users(parent, args, { db: { users } }, info) {
    if (!args.query) {
      return users
    }

    return users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase())
    })
  },
  posts(parent, args, { db: { posts } }, info) {
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
  comments(parent, args, { db: { comments } }, info) {
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
}

export { Query as default }
