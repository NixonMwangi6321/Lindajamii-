const incidentService =
require("./incident.service");

const createIncident =
async (req, res) => {

  try {

    const incident =
    await incidentService.createIncident(
      req.body
    );

    return res.status(201).json({
      success: true,
      data: incident
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getIncidentByIncidentId =
async (req, res) => {

  try {

    const incident =
    await incidentService.getIncidentByIncidentId(
      req.params.incidentId
    );

    if (!incident) {

      return res.status(404).json({
        success: false,
        message: "Incident not found"
      });

    }

    return res.status(200).json({
      success: true,
      data: incident
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

const getIncidentTimeline =
async (req, res) => {

  try {

    const timeline =
    await incidentService.getIncidentTimeline(
      req.params.incidentId
    );

    return res.status(200).json({
      success: true,
      data: timeline
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};
const updateIncidentStatus =
async (req, res) => {

  try {

    const incident =
    await incidentService.updateIncidentStatus(
      req.params.incidentId,
      req.body.status
    );

    res.json({
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
  createIncident,
  getIncidentByIncidentId,
  getIncidentTimeline,
  updateIncidentStatus
};