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

        res.status(201).json({
            status: 'success',
            doctorCreated
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Error unexpected',
            doctorCreated
        })
    }
}

const updateDoctor = async (req, res) => {

    const uid = req.id

    try {

        const doctorExists = await Doctor.findById(req.params.id);

        if(doctorExists.email !== email) {
        const emailExists = await Doctor.findOne({ email })

            // * verify if email exists
            if(emailExists) {
                return res.status(400).json({
                status: 'warning',
                msg: 'Email already exists',
                })
            }
        }

        const doctorUpdated = {
            user: uid,
            ...req.body
        }

        const doctorUpdatedShow = await Doctor.findByIdAndUpdate(req.params.id, doctorUpdated, { new: true })

        res.status(201).json({
            status: 'success',
            msg: 'Doctor Update successfully',
            doctorUpdatedShow
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Doctor not found'
        })
    }
}

const deleteDoctor = async (req, res) => {

    try {

        await Doctor.findByIdAndDelete(req.params.id)

        res.json({
            status: 'success',
            msg: 'Doctor deleted successfully'
        })
    } catch (error) {
        res.status(500).json({
            status: 'fail',
            msg: 'Doctor not found'
        })
    }
}

module.exports = {
    getDoctor,
    createDoctor,
    updateDoctor,
    deleteDoctor,
}

