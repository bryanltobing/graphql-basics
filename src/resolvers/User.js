const User = {
  posts(parent, args, { db: { posts } }, info) {
    return posts.filter((post) => {
      return post.authorId === parent.id
    })
  },
  comments(parent, args, { db: { comments } }, info) {
    return comments.filter((comment) => {
      return comment.authorId === parent.id
    })
  },
}

export { User as default }
