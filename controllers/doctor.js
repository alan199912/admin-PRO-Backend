const Doctor = require('../models/doctor')

const getDoctor = async (req, res) => {
    try {

        const doctors = await Doctor.find().populate('user', 'name').populate('hospital', 'name')

        res.json({
            status: 'success',
            doctors
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected'
        })
    }
}

const createDoctor = async (req, res) => {
    try {

        const uid = req.id
        
        const doctor = new Doctor({
            user: uid,
            ...req.body
        })

        const doctorCreated = await doctor.save()

        res.json({
            status: 'success',
            doctorCreated
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected'
        })
    }
}

const updateDoctor = (req, res) => {
    try {
        res.json({
            status: 'success',
            msg: 'update a doctor'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected'
        })
    }
}

const deleteDoctor = (req, res) => {
    try {
        res.json({
            status: 'success',
            msg: 'delete a doctor'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected'
        })
    }
}

module.exports = {
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}

