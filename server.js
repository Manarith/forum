const express = require('express')
const mongoose = require('mongoose')
const User = require('./models/userModel')
const app = express()
const port = 3000

app.use(express.json())

//routes

app.get('/', (req, res) => {
    res.send('Hello!')
})

app.get('/login', (req, res) => {
    res.send('Login form will be here...')
})

app.get('/users', async(req, res) => {
    try {
        const user = await User.find({});
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.get('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
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
//update the user

app.put('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//delete a user

app.delete('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: `cannot find any user with ID ${id}`})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
mongoose
.connect('mongodb+srv://admin:admin1@forumdb.z188qr5.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to MongoDB')
    app.listen(port, () => {
        console.log(`Forum app is running on port ${port}`)
    })
}).catch((error) => {
    console.log(error)
})