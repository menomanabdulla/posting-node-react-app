
const commentModule = require('../model/commentModule')

const Comments = ((req,res,next)=>{
    commentModule.find({post: ObjectId(req._id)})
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
    const post_id = req.params.id
    const user_name = `${res.locals}`
    const date = new Date().getTime()
    //console.log(post_id)
    //console.log(user_name)
    const comment= new commentModule({
        post: post_id,
        content: req.body.content,
        timestamp: date
    })
    console.log('this is commentmodule',comment)
    comment.save()
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
                err: 'Error happend'
            })
        })
})

/*const updateComment = ((req,res,next)=>{
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
})*/

/*const deleteComment = ((req,res,next)=>{
    const id = req.params.id
    commentModule.findOneAndRemove({ _id: id })
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
})*/

module.exports = {
    Comments,
    createComment
}