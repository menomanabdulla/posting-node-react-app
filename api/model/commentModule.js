const mongoose = require('mongoose')
const Schema = mongoose.Schema,
        ObjectId = Schema.ObjectId;

const commentSchema = new Schema({
    post: {
        type: ObjectId,
        required: true
    },
    content:{
        type: String,
        minlength: 1,
        trim: true
    },
    timestamp: {type: Date, date: Date.now}
  })

  const comment = mongoose.model('comment', commentSchema)
  module.exports = comment