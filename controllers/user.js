const User = require('../models/user')
const bcryptjs  = require('bcryptjs')
const { validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {

  const pagination = Number(req.query.pagination) || 0

  // * runs simultaneously
  const [ users, totalRecord ] = await Promise.all([
    User.find({}, 'name email role google img').skip( pagination ).limit(5),
    User.countDocuments()
  ])

  res.json({
    status: 'success',
    users,
    totalRecord
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
      msg: 'Error unexpected',
      user
    })
  }

};

const updateUser = async (req, res) => {

  const { password, google, email, ...fields } = req.body

  try {

    const userExists = await User.findById(req.params.id);

    if(userExists.email !== email) {
      const emailExists = await User.findOne({ email })

      // * verify if email exists
      if(emailExists) {
        return res.status(400).json({
          status: 'warning',
          msg: 'Email already exists',
        })
      }
    }
    if(!userExists.google) {
      fields.email = email
    }

    const userUpdated = await User.findByIdAndUpdate(req.params.id, fields, { new: true })
    
    res.json({
      status: 'success',
      msg: 'User edited successfully',
      userUpdated
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'User not found'
    })
  }

};

const deleteUser = async (req, res) => {

  try {

    await User.findByIdAndDelete(req.params.id)
    
    res.json({
      status: 'success',
      msg: 'User deleted successfully'
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'User not found'
    })
  }

};

module.exports = {
  getUsers,
  createUsers,
  updateUser,
  deleteUser
};
