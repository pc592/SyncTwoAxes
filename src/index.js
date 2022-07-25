const DEFAULTS = {
  minTicks: 3,
  maxTicks: 10,
};

const calculateNiceNum = (niceFraction, exponent) => (
  niceFraction * 10 ** exponent
);

const getNiceNums = (range, shouldRound) => {
  const exponent = Math.floor(Math.log10(range));
  const fraction = range / 10 ** exponent;

  const niceNums = [];

  if (shouldRound) {
    if (fraction < 1.5) { niceNums.push(calculateNiceNum(1, exponent)); }
    if (fraction < 3) { niceNums.push(calculateNiceNum(2, exponent)); }
    if (fraction < 7) { niceNums.push(calculateNiceNum(5, exponent)); }
    if (fraction >= 7) { niceNums.push(calculateNiceNum(10, exponent)); }
  } else {
    if (fraction <= 1) { niceNums.push(calculateNiceNum(1, exponent)); }
    if (fraction <= 2) { niceNums.push(calculateNiceNum(2, exponent)); }
    if (fraction <= 5) { niceNums.push(calculateNiceNum(5, exponent)); }
    if (fraction >= 7) { niceNums.push(calculateNiceNum(10, exponent)); }
  }

  return niceNums;
};

/**
 * Calculate nice tick counts and intervals for an axis.
 */
const niceScale = (axis, minTicks, maxTicks, tickCountsToIntervals) => {
  const minPoint = axis.min;
  const maxPoint = axis.max;

  const niceRanges = getNiceNums(maxPoint - minPoint, false);
  niceRanges.forEach((niceRange) => {
    const tickIntervals = getNiceNums(niceRange / (maxTicks - 1), true);
    tickIntervals.forEach((tickInterval) => {
      const tickCount = maxPoint / tickInterval;
      if (tickCount >= minTicks && tickCount <= maxTicks) {
        tickCountsToIntervals[tickCount] = tickInterval; // eslint-disable-line no-param-reassign
      }
    });
  });
};

/**
 * Determines the "nice"est tick intervals (values) given two axes. If there are multiple
 *   options, it should return the largest tick count first.
 *
 * @param {object} axis1 Contains the min and max property, for the min and max values of an axis.
 * @param {object} axis2 Contains the min and max property, for the min and max values of an axis.
 * @param {number} [minTicks=3] The minimum count of ticks to be algined upon.
 * @param {number} [maxTicks=20] The minimum count of ticks to be aligned upon.
 *
 * @return If an alignment is not found, returns 'None'.
 *   If an alignment is found, returns an object containing the following:
 *   {
 *     tickCount: the number of ticks on the graph, that will align between axis1 and axis2.
 *     axis1TickInterval: the intervals for axis1
 *     axis2TickInterval: the intervals for axis2
 *   }
 */
const getAlignedTicksForTwoAxes = (
  axis1,
  axis2,
  minTicks = DEFAULTS.minTicks,
  maxTicks = DEFAULTS.maxTicks,
) => {
  const axis1TickCountsToIntervals = {};
  const axis2TickCountsToIntervals = {};
  niceScale(axis1, minTicks, maxTicks, axis1TickCountsToIntervals);
  niceScale(axis2, minTicks, maxTicks, axis2TickCountsToIntervals);

  let alignedTicks = 'None';
  Object.keys(axis1TickCountsToIntervals).sort().reverse().forEach((tickCount) => {
    if (axis2TickCountsToIntervals[tickCount]) {
      alignedTicks = {
        tickCount: Number(tickCount),
        axis1TickInterval: axis1TickCountsToIntervals[tickCount],
        axis2TickInterval: axis2TickCountsToIntervals[tickCount],
      };
    }
  });

  return alignedTicks;
};

module.exports = getAlignedTicksForTwoAxes;
