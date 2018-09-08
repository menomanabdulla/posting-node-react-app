const comment = require('../model/model')


const Comment = ((req,res,next)=>{
    comment.find({manager: ObjectId(req._id)})
        .then(result=>{
            if(result){
                res.status(200).json({
                   result
                })
            }else{
                res.status(404).json({
                    err: 'no data exist'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                err: 'Error Occured'
            })
        })
})

const createComment = ((req,res,next)=>{
    const date = new Date().getTime()
    const post = new comment({
        name: req.body.name,
        content: req.body.content,
        timestamp: date
    })
    post.save()
        .then(data=>{
            if(data){
                res.status(200).json({
                    data 
                })
            }else{
                res.status(500).json({
                    err: 'Can\'t be empty'
                })
            }
        })
        .catch(err=>{
            res.status(500).json({
                errMsg: 'Error happend'
            })
        })
})

const updateComment = ((req,res,next)=>{
    const id = req.params.id
    Post.findByIdAndUpdate(id,{$set : req.body},{new: true})
        .then(result=>{
            if(result){
                res.status(200).json({
                    result
                })
            }else{
                res.status(404).json({
                    err: 'no data exist'
                })
            } 
        })
        .catch(err=>{
            res.status(500).json({
                err: 'Error Occured'
            })
        })
})

const deleteComment = ((req,res,next)=>{
    const id = req.params.id
    Post.findOneAndRemove({ _id: id })
    .then(afDeletePost=>{
        console.log(afDeletePost)
        res.json({
            afDeletePost
        })
    })
    .catch(err=>{
        res.json({
            msg: 'There is no post for drope'
        })
    })
})

module.exports = {
    Comment,
    createComment,
    updateComment,
    deleteComment
}