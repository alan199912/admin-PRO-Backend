
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require('../helpers/google-verify')


const login = async (req, res) => {
    const { email, password } = req.body
    
    try {

        const user = await User.findOne({ email })

        if(!user) {
            return res.status(404).json({
                status: 'warning',
                msg: 'email not found'
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword) {
            return res.status(404).json({
                status: 'warning',
                msg: 'password is incorrect'
            })
        }

        const token = await generateJWT(user.id)

        res.json({
            status: 'success',
            token
        })
    } catch (error) {
        res.status(500).json({
            status: 'Fail',
            msg: 'Error unexpected'
        })
    }
}

const googleSignIn = async (req, res) => {

    const googleToken = req.body.token
    
    try {

        const { name, email, picture } = await googleVerify(googleToken)

        // * verify email in bd
        const userDB = await User.findOne({ email })
        let user

        if(!userDB) {
            user = new User({
                name,
                email,
                password: '@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB
            user.google = true
        }
        
        // * save on db
        await user.save()

        const token = await generateJWT(user.id)

        res.json({
            status: 'success',
            token
        })
    } catch (error) {
        
        res.status(401).json({
            status: 'success',
            msg: 'Token no found'
        })
    }


}

module.exports = {
    login,
    googleSignIn
}