const Subscription = {
  count: {
    subscribe(parent, args, { pubSub }, info) {
      let count = 0

      setInterval(() => {
        count++
        pubSub.publish('count', {
          count,
        })
      }, 1000)

      return pubSub.asyncIterator('count')
    },
  },
  comment: {
    subscribe(parent, { postId }, { db: { posts }, pubSub }, info) {
      const post = posts.find((post) => post.id === postId && post.published)

      if (!post) {
        throw new Error('Post not found')
      }

      return pubSub.asyncIterator(`COMMENT ${postId}`)
    },
  },
  post: {
    subscribe(parent, args, { pubSub }, info) {
      return pubSub.asyncIterator('POST')
    },
  },
}

export { Subscription as default }
