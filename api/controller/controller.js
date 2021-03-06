const Post = require('../model/model')


const allpost = ((req,res,next)=>{
    Post.find()
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

const createPost = ((req,res,next)=>{
    const date = new Date().getTime()
    const post = new Post({
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

const getSinglePost = ((req,res,next)=>{
    const id = req.params.id
    Post.findById(id)
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

const updatePost = ((req,res,next)=>{
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

const deletePost = ((req,res,next)=>{
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
    allpost,
    createPost,
    getSinglePost,
    updatePost,
    deletePost
}