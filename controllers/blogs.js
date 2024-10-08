const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {
            username: 1,
            name: 1
        })
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body

    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0,
        user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    const createdBlog = await Blog
        .findById(savedBlog._id)
        .populate('user', {
            username: 1,
            name: 1
        })
    response.status(201).json(createdBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body
    const id = request.params.id

    const update = {
        likes: body.likes,
        user: body.user,
        author: body.author,
        title: body.title,
        url: body.url
    }
    
    await Blog.findByIdAndUpdate(
        id,
        update,
        { new: true }
    )

    const updatedBlog = await Blog
        .findById(id)
        .populate('user', {
            username: 1,
            name: 1
        })
    response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
