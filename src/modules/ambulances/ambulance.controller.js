const ambulanceService =
require("./ambulance.service");

const createAmbulance =
async (req, res) => {

  try {

    const ambulance =
    await ambulanceService.createAmbulance(
      req.body
    );

    res.status(201).json({
      success: true,
      data: ambulance
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getAmbulances =
async (req, res) => {

  const ambulances =
  await ambulanceService.getAmbulances();

  res.json({
    success: true,
    data: ambulances
  });

};

module.exports = {
  createAmbulance,
  getAmbulances
};