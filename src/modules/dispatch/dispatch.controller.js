const dispatchService =
require("./dispatch.service");

const updateDispatchStatus =
async (req, res) => {

  try {

    const dispatch =
    await dispatchService.updateDispatchStatus(
      req.params.id,
      req.body.status,
      req.body.notes
    );

    return res.status(200).json({
      success: true,
      data: dispatch
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }

};

module.exports = {
  updateDispatchStatus
};