const fireVehicleService =
require("./fireVehicle.service");

const createFireVehicle =
async (req, res) => {

  try {

    const vehicle =

    await fireVehicleService.createFireVehicle(
      req.body
    );

    return res.status(201).json({

      success: true,

      data: vehicle

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getAllFireVehicles =
async (req, res) => {

  try {

    const vehicles =

    await fireVehicleService.getAllFireVehicles();

    return res.json({

      success: true,

      data: vehicles

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  createFireVehicle,

  getAllFireVehicles

};