const Comment = {
  author(parent, args, { db: { users } }, info) {
    const parentAuthorId = parent.authorId
    return users.find((user) => user.id === parentAuthorId)
  },
  post(parent, args, { db: { posts } }, info) {
    const parentPostId = parent.postId
    return posts.find((post) => post.id === parentPostId)
  },
}

export { Comment as default }
