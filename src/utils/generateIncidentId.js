const generateIncidentId = () => {
  const random =
  Math.floor(Math.random() * 100000);

  return `LJ-${Date.now()}-${random}`;
};

module.exports = generateIncidentId;