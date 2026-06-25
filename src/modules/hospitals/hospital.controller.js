const hospitalService =
require("./hospital.service");

const createHospital =
async (req, res) => {

  try {

    const hospital =
    await hospitalService.createHospital(
      req.body
    );

    res.status(201).json({
      success: true,
      data: hospital
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getHospitals =
async (req, res) => {

  const hospitals =
  await hospitalService.getHospitals();

  res.json({
    success: true,
    data: hospitals
  });
};

module.exports = {
  createHospital,
  getHospitals
};