const routingService =
require("./routing.service");

const getRoute =
async (req, res) => {

  try {

    const route =
    await routingService.calculateRoute(

      req.body.origin,

      req.body.destination

    );

    res.json({

      success: true,

      data: route

    });

  }

  catch (error) {

    res.status(500).json({

      success: false,

      message: error.message

    });

  }

};

module.exports = {
  getRoute
};