// assuming 100 xp per level
const calculateLevel = (totalXP) => {
  return Math.floor(totalXP / 100);
};

module.exports = {
  calculateLevel,
};
