const route = require('express').Router()
const postController = require('../controller/controller')
//POST get
route.get('/',postController.allpost)

//POST create
route.post('/',postController.createPost)

//SINGLE-POST get
route.get('/:id',postController.getSinglePost)

//UPDATE post
route.patch('/:id',postController.updatePost)

//DELETE post
route.delete('/:id',postController.deletePost)

module.exports = route