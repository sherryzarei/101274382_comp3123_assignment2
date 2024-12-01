const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/userModel.js')
const jwt = require('jsonwebtoken')
const validateToken = require('../middleware/validateTokenHandler.js');

require('dotenv').config();

router.post('/login', async(req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide both email and password' });
    }

    const user = await User.findOne({ email: email });
    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user._id
            },
        }, process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
        res.status(200).json({  "message": "Login successful." ,token });
    } else {
        res.status(401).json({ error: 'Invalid email or password' });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const { password, username, email } = req.body;
        
        if(!password || !username || !email){
            return res.status(400).json({ error: 'Please provide all required fields' });
        }

        const existingUser = await User.findOne({ username: username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const hash = await bcrypt.hash(password, 13);
        const user = await User.create({
            username: username,
            email: email,
            password: hash 
        });

        const message = "User created successfully.";
        res.status(201).json({
            message,
            user_id : user._id
        });
    } catch (error) {
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
});

router.get('/current', validateToken, (req, res) => {
    res.json( req.user);
});

module.exports = router;
