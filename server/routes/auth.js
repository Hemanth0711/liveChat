const express = require("express");
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcrypt');

// Register
router.route('/register').post( async(req, res, next) => {
    console.log('entered register');
    try  {
        const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });

        if (existingUser) {
            // Handle duplicate username or email
            res.status(200).json({ message: "User already exists. Please log in or use different credentials." });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            username: req.body.username, 
            email: req.body.email,
            password: hashedPass
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        
        if (!user) {
            res.status(400).json("Wrong Credentials!");
            return;
        }
        const validated = await bcrypt.compare(req.body.password, user.password);
        if(!validated){
            res.status(400).json("Wrong Credentials!");
            return;
        }
        const { password, ...others } = user._doc;
        res.status(200).json(others);
        
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;