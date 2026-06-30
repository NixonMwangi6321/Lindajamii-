const missionService =
require("./mission.service");

const getMission =
async (req, res) => {

  try {

    const mission =
    await missionService.getMission(
      req.params.missionId
    );

    if (!mission) {

      return res.status(404).json({

        success: false,

        message: "Mission not found"

      });

    }

    return res.status(200).json({

      success: true,

      data: mission

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const getActiveMissions =
async (req, res) => {

  try {

    const missions =
    await missionService.getActiveMissions();

    return res.status(200).json({

      success: true,

      count: missions.length,

      data: missions

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

const updateMissionStatus =
async (req, res) => {

  try {

    const mission =
    await missionService.updateMissionStatus(

      req.params.missionId,

      req.body.status

    );

    return res.status(200).json({

      success: true,

      data: mission

    });

  } catch (error) {

    return res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {

  getMission,

  getActiveMissions,

  updateMissionStatus

};