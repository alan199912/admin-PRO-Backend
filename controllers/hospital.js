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
    const hospitalCreated = await hospital.save();
    
    res.json({
      status: 'success',
      hospitalCreated
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

  const { name } =  req.body
  const uid = req.id

  try {

    if(hospitalExists.name !== name) {
      const nameExists = await Hospital.findOne({ name })

      // * verify if email exists
      if(nameExists) {
        return res.status(400).json({
          status: 'warning',
          msg: 'Already exists an Hospital with this name'
        })
      }
    }

    const updatedHospital = {
      ...req.body,
      user: uid
    }

    await Hospital.findByIdAndUpdate(req.params.id, updatedHospital, { new: true })
    
    res.json({
      status: 'success',
      msg: 'Hospital edited successfully'
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'Hospital not found'
    })
  }

};

const deleteHospital = async (req, res) => {

  try {

    await Hospital.findByIdAndDelete(req.params.id)
    
    res.json({
      status: 'success',
      msg: 'Hospital deleted successfully'
    });
    
  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: 'fail',
      msg: 'Hospital not found'
    })
  }

};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
};
