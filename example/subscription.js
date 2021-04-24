const Subscription = {
  count: {
    subscribe(parent, args, { pubSub }, info) {
      let count = 0

      setInterval(() => {
        count++
        pubSub.publish('count', {
          // this should match with the return type of the field type
          count,
        })
      }, 1000)

      return pubSub.asyncIterator('count')
    },
  },
}
