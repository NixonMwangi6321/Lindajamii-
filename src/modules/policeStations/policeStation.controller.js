const policeStationService =
require("./policeStation.service");

const createPoliceStation =
async (req, res) => {

  try {

    const station =
    await policeStationService.createPoliceStation(
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

const getPoliceStations =
async (req, res) => {

  const stations =
  await policeStationService.getPoliceStations();

  res.json({
    success: true,
    data: stations
  });
};

module.exports = {
  createPoliceStation,
  getPoliceStations
};