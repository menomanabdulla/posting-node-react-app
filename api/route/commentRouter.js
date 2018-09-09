
const router = require('express').Router()
const commentController = require('../controller/commentController')
const authenticat = require('../middlewares/protector')

router.get('/allComments',authenticat, commentController.Comments)
router.post('/:id',authenticat,commentController.createComment)
//router.patch('/update',authenticat, commentController.upadateComments)
//router.delete('/delete',authenticat, commentController.deleteComments)

module.exports = router