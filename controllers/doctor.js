const Doctor = require("../models/doctor");

const getDoctor = async (req, res) => {
  try {
    const doctors = await Doctor.find()
      .populate("user", "name")
      .populate("hospital", "name");

    res.json({
      status: "success",
      doctors,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      msg: "Error unexpected",
    });
  }
};

const getDoctorId = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);

    res.json({
      status: "success",
      doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      msg: "Error unexpected",
    });
  }
};

const createDoctor = async (req, res) => {
  try {
    const uid = req.id;

    const doctor = new Doctor({
      user: uid,
      ...req.body,
    });

    const doctorCreated = await doctor.save();

    res.status(201).json({
      status: "success",
      doctorCreated,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      msg: "Error unexpected",
      doctorCreated,
    });
  }
};

const updateDoctor = async (req, res) => {
  const uid = req.id;

  try {
    const doctorExists = await Doctor.findById(req.params.id);

    const doctorUpdated = {
      user: uid,
      ...req.body,
    };

    const doctorUpdatedShow = await Doctor.findByIdAndUpdate(
      req.params.id,
      doctorUpdated,
      { new: true }
    );

    res.status(201).json({
      status: "success",
      msg: "Doctor Update successfully",
      doctorUpdatedShow,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      msg: "Doctor not found",
    });
  }
};

const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);

    res.json({
      status: "success",
      msg: "Doctor deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      msg: "Doctor not found",
    });
  }
};

module.exports = {
  getDoctor,
  getDoctorId,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
