const { User } = require('../models/User')

let auth = (req, res, next) => {
    //인증 처리를 하는 곳 
    //클라이언트의 쿠키에서 토큰을 가져온다
    let token = req.cookies.tokenInCookie
    //토큰으로 찾기 -> User Schema
    User.findByToken(token, (err, user) => {
        if(err) throw err
        if(!user) return res.jseon({ isAuth: false, error:true })
        //에러가 업고 유저가 있다면
        req.token = token
        req.user = user
        next()
    })
}

module.exports = { auth }