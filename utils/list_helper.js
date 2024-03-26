const dummy = (blogs) => {
    return 1
}

const totalLikes = (listOfPosts) => {
    return listOfPosts.reduce((sum, post) => {
        return sum + post.likes
    }, 0)
}

const favouriteBlog = (listOfPosts) => {
    return listOfPosts.reduce((fav, post) => {
        if (post.likes > fav.likes) {
            const newLeader = {
                title: post.title,
                author: post.author,
                likes: post.likes
            }
            return newLeader
        } else {
            return fav
        }
    }, { likes: 0 })
}

module.exports = {
    dummy,
    totalLikes,
    favouriteBlog
}
