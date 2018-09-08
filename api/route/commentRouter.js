const router = require('express').Router()
const commentController = require('../controller/commentController')
const authenticat = require('../middlewares/protector')

router.get('/:id',authenticat, commentController.getComments)
router.post('/allComments',userController.signUpUser)
router.patch('/update',authenticat, commentController.upadateComments)
router.delete('/delete',authenticat, commentController.deleteComments)