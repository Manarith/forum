const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const app = express()

app.use(express.json())

//routes

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/login', (req, res) => {
    res.send('Login form will be here...')
})

app.post('/signup', async(req, res) => {
    try {
        const user = await User.create(req.body)
        res.status(200).json(user)

    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})


mongoose
.connect('mongodb+srv://admin:admin1@forumdb.z188qr5.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(3000, () => {
        console.log('Forum app is running on port 3000')
    })
}).catch((error) => {
    console.log(error)
})