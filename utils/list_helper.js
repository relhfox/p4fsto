const dummy = (blogs) => {
    return 1
}

const totalLikes = (listOfPosts) => {
    return listOfPosts.reduce((sum, post) => {
        return sum + post.likes
    }, 0)
}

module.exports = {
    dummy,
    totalLikes
}
