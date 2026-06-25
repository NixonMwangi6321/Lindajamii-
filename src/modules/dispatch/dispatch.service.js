const Dispatch =
require("./dispatch.model");

const createDispatch =
async (
  incidentId,
  ambulanceId
) => {

  return await Dispatch.create({
    incident: incidentId,
    ambulance: ambulanceId
  });

};

module.exports = {
  createDispatch
};