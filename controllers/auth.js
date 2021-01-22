
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");


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

module.exports = {
    login
}