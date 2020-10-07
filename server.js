const express = require('express')
const app = express()
const bodyPaser = require('body-parser')
const port = process.env.PORT || 5000
const mongoose = require('mongoose')
const {User} = require('./models/User')

app.use(bodyPaser.urlencoded({extended: true}))
app.use(bodyPaser.json())

app.get('/', (req, res) => {
    res.send('Landing Page')
})
//DB연결
mongoose.connect(
    'mongodb+srv://Jaewonks:Kk052614..@mall.htg21.mongodb.net/jaystudy?retryWrites=true&w=majority',
    {useNewUrlParser: true, useUnifiedTopology:true, useCreateIndex:true, useFindAndModify:false
    }).then(() => {console.log('connect to MongoDB')})
      .catch(err => console.log(err))

//회원가입
app.get('/api/users/signup', (req, res) => {
    //회원가입시 필요한 정보를 클라이언트에서 받아오면 req.body
    const user = new User(req.body)
    console.log(user)
    //데이터베이스에 넣어준다.
    //근데 넣어주기 전에 User.js에서 비밀번호를 암호화해야한다. gogo
    user.save((err, user) => {
        if(err) return res.json({ SignUpSucess: false, err })
        return res.status(200).json({ SignUpSucess: true })
    })
})

app.get('/api/users/signin', (req, res) => {

})

app.get('/api/users/auth', (req, res) => {

})


app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})