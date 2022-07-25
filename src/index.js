let minPoint;
let maxPoint;
let maxTicks = 20;
const tickSpacings = [];
const tickCounts = [];
const ranges = [];

const y1TickCountsToSpacings = { };
const y2TickCountsToSpacings = {};

console.log('solution:', twoAxes());

export function twoAxes() {
  const y1Range = [0, 100];
  const y2Range = [0, 90];

  const y1 = niceScale(y1Range[0], y1Range[1], 'y1');
  const y2 = niceScale(y2Range[0], y2Range[1], 'y2');

  console.log(`niceScale for ${JSON.stringify(y1Range)}`, y1);
  console.log(`niceScale for ${JSON.stringify(y2Range)}`, y2);
  console.log(`tickCountsToSpacings for ${JSON.stringify(y1Range)}`, y1TickCountsToSpacings);
  console.log(`tickCountsToSpacings for ${JSON.stringify(y2Range)}`, y2TickCountsToSpacings);

  for (const y1TickCount of Object.keys(y1TickCountsToSpacings)) {
    if (y2TickCountsToSpacings[y1TickCount]) {
      return {
        tickCount: y1TickCount,
        y1TickSpacing: y1TickCountsToSpacings[y1TickCount],
        y2TickSpacing: y2TickCountsToSpacings[y1TickCount],
      };
    }
  }
  return 'None';
}

/**
 * Instantiates a new instance of the NiceScale class.
 *
 *  min the minimum data point on the axis
 *  max the maximum data point on the axis
 */
function niceScale(min, max, axis) {
  minPoint = min;
  maxPoint = max;
  return calculate(axis);
}

/**
 * Calculate and update values for tick spacing and nice
 * minimum and maximum data points on the axis.
 */
function calculate(axis) {
  const tickSpacings = [];
  const tickCounts = [];
  let ranges = [];

  ranges = niceNum(maxPoint - minPoint, false);

  for (const range of ranges) {
    const tempTickSpacings = niceNum(range / (maxTicks - 1), true);
    tickSpacings.push(...tempTickSpacings);
    for (const tickSpacing of tempTickSpacings) {
      const tickCount = maxPoint / tickSpacing;
      tickCounts.push(tickCount);
      if (axis === 'y1') {
      	y1TickCountsToSpacings[tickCount] = tickSpacing;
      }
      if (axis === 'y2') {
      	y2TickCountsToSpacings[tickCount] = tickSpacing;
      }
    }
  }

  return {
    tickSpacings,
    tickCounts,
  };
}

/**
 * Returns a "nice" number approximately equal to range
 *
 * Rounds the number if round = true Takes the ceiling if round = false.
 *
 *  localRange the data range
 *  round whether to round the result
 *  a "nice" number to be used for the data range
 */
function niceNum(localRange, round) {
  let exponent; /** exponent of localRange */
  let fraction; /** fractional part of localRange */

  exponent = Math.floor(Math.log10(localRange));
  fraction = localRange / 10 ** exponent;

  const niceNums = [];

  if (round) {
    if (fraction < 1.5) { niceNums.push(calculateFinal(1, exponent)); }
    if (fraction < 3) { niceNums.push(calculateFinal(2, exponent)); }
    if (fraction < 7) { niceNums.push(calculateFinal(5, exponent)); }
    if (fraction >= 7) { niceNums.push(calculateFinal(10, exponent)); }
  } else {
    if (fraction <= 1) { niceNums.push(calculateFinal(1, exponent)); }
    if (fraction <= 2) { niceNums.push(calculateFinal(2, exponent)); }
    if (fraction <= 5) { niceNums.push(calculateFinal(5, exponent)); }
    if (fraction >= 7) { niceNums.push(calculateFinal(10, exponent)); }
  }

  return niceNums;
}

/** niceFraction  nice, rounded fraction */
function calculateFinal(niceFraction, exponent) {
  return niceFraction * 10 ** exponent;
}

/**
 * Sets the minimum and maximum data points for the axis.
 *
 *  minPoint the minimum data point on the axis
 *  maxPoint the maximum data point on the axis
 */
function setMinMaxPoints(localMinPoint, localMaxPoint) {
  minPoint = localMinPoint;
  maxPoint = localMaxoint;
  calculate();
}

/**
 * Sets maximum number of tick marks we're comfortable with
 *
 *  maxTicks the maximum number of tick marks for the axis
 */
function setMaxTicks(localMaxTicks) {
  maxTicks = localMaxTicks;
  calculate();
}
