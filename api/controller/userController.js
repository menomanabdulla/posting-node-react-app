
const userModel = require('../model/userModel')
const bcrypt = require('bcrypt-nodejs')
const jwt = require('jsonwebtoken')

const signUpUser = (req,res,next)=>{
    userModel.find({$or: [
        {email: req.body.email},
        {userName: req.body.userName}
    ]})
    .then(result=>{
        if(result.length>0){
            console.log(12)
            res.json({
                msg: 'This user is exist'
            })
        }else{
            bcrypt.hash(req.body.password, null, null, function(err, hash) {
                if(err){
                    res.json({
                        msg: 'hashing faild'
                    })
                }else{
                    const user = new userModel({
                        name: req.body.name,
                        email: req.body.email,
                        userName: req.body.userName,
                        password: hash
                    })
                    user.save()
                      .then(user=>{
                          console.log(user)
                          res.status(201).json({
                            user
                          })
                      })
                
                      .catch(err=>{
                          console.log(err)
                          res.status(500).json({
                              err
                          })
                      })
                }
            })
        }
    })
   
  }
  
const signInUser = (req,res,next)=>{
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password 
    const userName = req.body.userName
   
    console.log(email)
    console.log(password)
    console.log(userName)

    userModel.findOne({$or: [
        {email},
        {userName}
    ]})
    .then(user=>{
        bcrypt.compare(password, user.password, (err, result)=> {
            // res = false
            if(err){
                res.json({
                    msg: 'Authentication faild'
                })
            }else{
                const token = jwt.sign({  
                    email: user.email,
                    _id: user._id
                     }, 'SECRET',{
                         expiresIn: '1h'
                     }
                 )
                res.json({
                    "token" : token
                })
            }
        })
    })
    .catch(err=>{
        console.log(err)
        res.json({
            msg: 'Catch Block Authentication faild'
        })
    })
}
const singleUser = (req,res,next)=>{
   const id = req.params.id
   userModel.findById({_id : id})
    .then(singleUser=>{
        console.log(singleUser)
        res.send(singleUser)
    })
    .catch(err=>{
        console.log(err)
        res.send(err)
    })
}
const user = (req,res,next)=>{
    userModel.find()
        .then(user=>{
            if(user.length>0){
                res.status(200).json({
                    user
                })
            }else{
                res.status(200).json({
                    msg: 'there data is empty'
                })
            }
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                err
            })
        })
}
  
const upadateUser = (req,res,next)=>{
      const id = `${res.locals._id}`
      userModel.findByIdAndUpdate(id,{$set: req.body},{ new: true })
        .then(updateUser=>{
            console.log(updateUser)
            res.json({
                updateUser
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                err
            })
        })
  }
const deleteUser = (req,res,next)=>{
    const id = `${res.locals._id}`
    userModel.findByIdAndUpdate(id,{$set: req.body},{ new: true })
      .then(updateUser=>{
          console.log(updateUser)
          res.json({
              updateUser
          })
      })
      .catch(err=>{
          console.log(err)
          res.status(500).json({
              err
          })
      })
}

module.exports = {
    signUpUser,
    signInUser,
    user,
    singleUser,
    upadateUser,
    deleteUser
}