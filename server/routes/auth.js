const router = require('express').Router();
const User = require('../models/user')
const bcrypt = require('bcrypt')
// Register

router.post('/register', async (req, res) => {
    const { username, email } = req.body
    const isUserNameExist = await User.findOne({ username });
    if (isUserNameExist) {
        res.send("Sorry username already exist.")
    }
    else {
        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            res.send("Email already exists.")
        }
        else {
            await User.create(req.body);
            res.send(req.body);
        }
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const isEmailExist = await User.findOne({ email: email });
        if (isEmailExist) {
            const isPasswordMatch = await bcrypt.compare(password, isEmailExist.password);
            if (isPasswordMatch) {
                res.send({ code: 1, msg: isEmailExist })
            }
            else {
                res.send({ code: 0, msg: "Invalid Credentials" });
            }
        }
        else {
            res.send({ code: 0, msg: "Invalid Credentials" });
        }
    } catch (error) {
        res.send("An unexpected error occured")
    }
})




module.exports = router;
