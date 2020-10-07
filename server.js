const express = require('express')
const app = express()
const bodyParer = require('body-parser')
const port = process.env.PORT || 5000

app.use(bodyParer.urlencoded({extended: true}))
app.use(bodyParer.json())

app.use('/', (req, res) => {
    res.send('hello World')
})

app.listen(port,() => {
    console.log(`Listening on port ${port}`)
})