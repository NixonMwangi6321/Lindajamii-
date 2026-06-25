const fireStationService =
require("./fireStation.service");

const createFireStation =
async (req, res) => {

  try {

    const station =
    await fireStationService.createFireStation(
      req.body
    );

    res.status(201).json({
      success: true,
      data: station
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

const getFireStations =
async (req, res) => {

  const stations =
  await fireStationService.getFireStations();

  res.json({
    success: true,
    data: stations
  });
};

module.exports = {
  createFireStation,
  getFireStations
};