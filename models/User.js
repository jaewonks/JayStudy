const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength:50
    },
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minglength: 5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role : {
        type:Number,
        default: 0 
    },
    image: String,
    token : {
        type: String,
    },
    tokenExp :{
        type: Number
    }
})

userSchema.pre('save', function(next){
    var user = this;
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)
    
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    } else {
        next()
    }
})

userSchema.methods.comparePassword = function(purePW, callback) {
    bcrypt.compare(purePW, this.password, function(err, isMatch){
        if(err) return callback(err)
        callback(null, isMatch)
    })
}

userSchema.methods.generateToken = function(callback){
    //user_id는 몽고 DB에서 자체적으로 생성해주는 것 
    const user = this
    const token = jwt.sign(user._id.toHexString(), 'userToken')
    console.log(token)
    //생성된 토큰을 { token: } 에 저장
    user.token = token
    //데이터베이스에 넣어준다
    user.save(function(err, user){
        if(err) return callback(err)
        callback(null, user)
    })
}

userSchema.statics.findByToken = function(token, callback){
    const user = this
    jwt.verify(token, 'userToken', function(err, decoded){
        //유저아이디를 이용하여 유저를 찾은 다음
        //클라이언트에서 가져온 token과 DB에 보관된 토큰의 일치 여부 확인
        user.findOne({
            '_id': decoded,
            'token': token
        }, function(err,user){
            if(err) return callback(err)
            callback(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = { User }