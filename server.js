const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const postRoute = require('./api/route/route')
//db connection 
mongoose.Promise = global.Promise
mongoose.connect('mongodb://posting-admin:postingadmin123321postingadmin@ds211592.mlab.com:11592/post-app',{
    useNewUrlParser: true
})
.then(res => console.log(`DB Connect`))
.catch(err => console.log(err))

//middleware
app.use(cors())
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use('/api/post', postRoute)

//error handaling
app.use((req,res,next)=>{
    const err = new Error('not found')
    err.status = 404
    next(err)
})

app.use((error,req,res,next) =>{
    res.status(error.status || 500)
    res.json({
        error
    })
})

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})

app.get('/',(req,res)=>{
    res.json({
        msg: 'hello world'
    })
})