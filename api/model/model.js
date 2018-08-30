const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
    name:{
        type: String,
        minlength: 2,
        maxlength: 20,
        trim: true
    },
    content:{
        type: String,
        minlength: 1,
        trim: true
    },
    like:{
        type: Boolean,
        likeCount: 0
    },
    timestamp: {type: Date, date: Date.now}
  })

  const post = mongoose.model('post', postSchema)
  module.exports = post