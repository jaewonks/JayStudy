const { modelNames } = require('mongoose')

//환경변수 process.env.NODE_EVN
if(process.env.NODE_EVN === 'production'){
    module.exports = require('./prod')
} else {
    module.exports = require('./dev')
}