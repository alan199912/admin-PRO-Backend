const Hospital = require('../models/hospital')

const { validationResult } = require('express-validator');
const { generateJWT } = require('../helpers/jwt');

const getHospitals = async (req, res) => {

  const hospitals = await Hospital.find().populate('user', 'name')

  res.json({
    status: 'success',
    hospitals
  });
};

const createHospital = async (req, res) => {

  try {
    const uid = req.id // * uid user authenticate token

    const hospital = new Hospital({
      user: uid,
      ...req.body
    })
    
    // * save user
    const hispotalCreated = await hospital.save();
    
    res.json({
      status: 'success',
      hispotalCreated
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'Error unexpected'
    })
  }

};

const updateHospital = async (req, res) => {

  // const { password, google, email, ...fields } = req.body

  try {

    // const userExists = await User.findById(req.params.id)

    // // * verify if user exists
    // if(!userExists) {
    //   return res.status(400).json({
    //     status: 'warning',
    //     msg: 'User not exists'
    //   })
    // }

    // if(userExists.email !== email) {
    //   const emailExists = await User.findOne({ email })

    //   // * verify if email exists
    //   if(emailExists) {
    //     return res.status(400).json({
    //       status: 'warning',
    //       msg: 'Email already exists'
    //     })
    //   }
    // }

    // fields.email = email

    // await User.findByIdAndUpdate(req.params.id, fields, { new: true })
    
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

const deleteHospital = async (req, res) => {

  try {

    // const userExists = await User.findById(req.params.id)

    // // * verify if user exists
    // if(!userExists) {
    //   return res.status(400).json({
    //     status: 'warning',
    //     msg: 'User not exists'
    //   })
    // }


    // await User.findByIdAndRemove(req.params.id)
    
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
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
};
