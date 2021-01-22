const User = require('../models/user')
const bcryptjs  = require('bcryptjs')
const { validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

  const users = await User.find()

  res.json({
    status: 'success',
    users
  });
};

const createUsers = async (req, res) => {

  const { email, password } = req.body

  try {

    const emailExists = await User.findOne({ email })

    // * verify if email exists
    if(emailExists) {
      return res.status(400).json({
        status: 'warning',
        msg: 'Email already exists'
      })
    }
    
    const user = new User(req.body)
    
    // * Crypting password
    const salt = bcryptjs.genSaltSync()

    user.password = bcryptjs.hashSync(password, salt)

    // * save user
    await user.save();

    const token = await generateJWT(user.id)
    
    res.json({
      status: 'success',
      token
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'Error unexpected'
    })
  }

};

const updateUser = async (req, res) => {

  const { password, google, email, ...fields } = req.body

  try {

    const userExists = await User.findById(req.params.id)

    // * verify if user exists
    if(!userExists) {
      return res.status(400).json({
        status: 'warning',
        msg: 'User not exists'
      })
    }

    if(userExists.email !== email) {
      const emailExists = await User.findOne({ email })

      // * verify if email exists
      if(emailExists) {
        return res.status(400).json({
          status: 'warning',
          msg: 'Email already exists'
        })
      }
    }

    fields.email = email

    await User.findByIdAndUpdate(req.params.id, fields, { new: true })
    
    res.json({
      status: 'success',
      msg: 'User edited successfully'
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'Error unexpected'
    })
  }

};

const deleteUser = async (req, res) => {

  try {

    const userExists = await User.findById(req.params.id)

    // * verify if user exists
    if(!userExists) {
      return res.status(400).json({
        status: 'warning',
        msg: 'User not exists'
      })
    }


    await User.findByIdAndRemove(req.params.id)
    
    res.json({
      status: 'success',
      msg: 'User deleted successfully'
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'Error unexpected'
    })
  }

};

module.exports = {
  getUsers,
  createUsers,
  updateUser,
  deleteUser
};
