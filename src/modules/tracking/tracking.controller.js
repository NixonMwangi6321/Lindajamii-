const trackingService =
require("./tracking.service");

const updateVehicleLocation =
async (req, res) => {

  try {

    const {

      vehicleCode,

      latitude,

      longitude,

      speed,

      heading

    } = req.body;

    // Validate required fields
    if (

      !vehicleCode ||

      latitude === undefined ||

      longitude === undefined

    ) {

      return res.status(400).json({

        success: false,

        message:
        "vehicleCode, latitude and longitude are required."

      });

    }

    const vehicle =
    await trackingService.updateLocation(

      vehicleCode,

      Number(latitude),

      Number(longitude),

      Number(speed || 0),

      Number(heading || 0)

    );

    return res.status(200).json({

      success: true,

      message:
      "Vehicle location updated successfully.",

      data: vehicle

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  updateVehicleLocation

};