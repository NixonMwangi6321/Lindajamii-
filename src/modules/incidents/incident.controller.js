const incidentService =
require("./incident.service");

const createIncident =
async (req, res) => {

  try {

    const incident =
    await incidentService.createIncident(
      req.body
    );

    res.status(201).json({
      success: true,
      data: incident
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }
};

module.exports = {
  createIncident
};