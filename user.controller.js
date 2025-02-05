const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let register = async (req, res) => {
    try {
        const { fullname, email, password } = req.body
        if (!fullname || !email || !password ) {
            return res.status(400).json({
                message: "Something is missing",
                Success: false
            })
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({
                message: "User already exist with this email"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        await User.create({
            fullname,
            email,
            password: hashedPassword,
        })
        return res.status(201).json({
            message: "Account Created Successfully",
            success: true
        })
    }
    catch (err) {
        console.log(err)
    }
}

let login = async (req, res) => {
    try {
        let { email, password, role } = req.body
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                Success: false
            })
        }
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({
                message: "Incorrect Password or Email",
                success: false
            })
        }
        let isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect Password or Email",
                success: false
            })
        }
        if (role != user.role) {
            return res.status(400).json({
                message: "Account doesn't exist with this role",
                success: false
            })
        }
        let tokenData = {
            userId: user._id
        }
        let token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })

        user = {
            _id: user.id,
            fullname: user.fullname,
            email: user.email
        }
        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        })
    }
    catch (err) {
        console.log(err)
    }
}



module.exports = { register, login }