const getAlignedTicksForTwoAxes = require('../../src/index');

describe("Axes align on 'nice' intervals", () => {
  it('should return the expected response', () => {
    const axis1 = {
      min: 0,
      max: 200,
    };
    const axis2 = {
      min: 0,
      max: 50,
    };

    const result = getAlignedTicksForTwoAxes(axis1, axis2);

    const expectedResult = {
      tickCount: 10,
      axis1TickInterval: 20,
      axis2TickInterval: 5
    }
    expect(result).toStrictEqual(expectedResult);
  });
});

describe("Axes align on 'nice' intervals below the minimum", () => {
  it("should return 'None'", () => {
    const axis1 = {
      min: 0,
      max: 10,
    };
    const axis2 = {
      min: 0,
      max: 12,
    };

    const result = getAlignedTicksForTwoAxes(axis1, axis2);

    const expectedResult = 'None';
    expect(result).toStrictEqual(expectedResult);
  });
});

describe("Axes do not align on 'nice' intervals", () => {
  it("should return 'None'", () => {
    const axis1 = {
      min: 0,
      max: 100,
    };
    const axis2 = {
      min: 0,
      max: 90,
    };

    const result = getAlignedTicksForTwoAxes(axis1, axis2, 3, 30);

    const expectedResult = 'None';
    expect(result).toStrictEqual(expectedResult);
  });
});
