const analyticsService =
require("./analytics.service");

const getAnalytics =
async (req, res) => {

  try {

    const data =
      await analyticsService.getAnalytics();

    res.json({
      success: true,
      data
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  getAnalytics
};