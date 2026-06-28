const Incident = require("../incidents/incident.model");

const getAnalytics = async () => {

  const totalIncidents =
    await Incident.countDocuments();

  const resolved =
    await Incident.countDocuments({
      status: "RESOLVED"
    });

  const active =
    await Incident.countDocuments({
      status: {
        $nin: ["RESOLVED", "CLOSED"]
      }
    });

  const byCategory =
    await Incident.aggregate([
      {
        $group: {
          _id: "$category",
          total: {
            $sum: 1
          }
        }
      }
    ]);

  const byPriority =
    await Incident.aggregate([
      {
        $group: {
          _id: "$priority",
          total: {
            $sum: 1
          }
        }
      }
    ]);

  return {
    totalIncidents,
    active,
    resolved,
    byCategory,
    byPriority
  };

};

module.exports = {
  getAnalytics
};