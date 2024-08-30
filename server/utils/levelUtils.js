/**
 * @file xpUtils.js
 * @description Utility functions for XP calculations, including determining the level based on total XP.
 * @module xpUtils
 * @requires None
 */

/**
 * @function calculateLevel
 * @description Calculates the level based on the total XP. Assumes 100 XP per level.
 * @param {number} totalXP - The total amount of XP.
 * @returns {number} The calculated level.
 * @example
 * const level = calculateLevel(250);
 * console.log(level); // 2
 */
const calculateLevel = (totalXP) => {
  return Math.floor(totalXP / 100);
};

module.exports = {
  calculateLevel,
};
