const classifyIncident = (description) => {

  const text = description.toLowerCase();

  if (
    text.includes("accident") ||
    text.includes("crash")
  ) {
    return "ACCIDENT";
  }

  if (
    text.includes("fire")
  ) {
    return "FIRE";
  }

  if (
    text.includes("robbery") ||
    text.includes("theft")
  ) {
    return "CRIME";
  }

  if (
    text.includes("injury") ||
    text.includes("bleeding")
  ) {
    return "MEDICAL";
  }

  return "GENERAL";
};

module.exports = classifyIncident;