const calculatePriority = (description) => {

  const text = description.toLowerCase();

  if (
    text.includes("death") ||
    text.includes("multiple casualties")
  ) {
    return "CRITICAL";
  }

  if (
    text.includes("accident") ||
    text.includes("fire")
  ) {
    return "HIGH";
  }

  return "MEDIUM";
};

module.exports = calculatePriority;