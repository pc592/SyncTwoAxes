# sync-two-axes
Algorithm to sync/align two axes' ticks so that their intervals are 'nice'. If there are multiple 'nice' options, it should return the option with the largest tick count first.

Inspiration: https://stackoverflow.com/questions/8506881/nice-label-algorithm-for-charts-with-minimum-ticks/16363437#16363437

"[T]he "nicest" numbers in decimal are 1, 2, and 5, and all power-of-ten multiples of these numbers"

## Example

Imagine you have two data sets, both graphed on the same axis. The left, y1 axis, has a range of 0 to 200. The right, y2 axis, has a range of 0 to 50. For readability's sake, you want the tick marks across the two graphs to align on 'nice' numbers. That's where this algorithm comes in.

```js
  const y1 = {
    min: 0,
    max: 200,
  };
  const y2 = {
    min: 0,
    max: 50,
  };

  getAlignedTicksForTwoAxes(y1, y2);
```

Returns the following object:

```js
  {
    tickCount: 10,
    axis1TickInterval: 20,
    axis2TickInterval: 5,
  }
```

Which means there are 10 ticks across both axes, in intervals of 20 for y1 and intervals of 5 for y2.

You can also define _minTicks_ (default 3) and _maxTicks_ (default 10).

```js
  const minTicks = 15;
  const maxTicks = 30;
  getAlignedTicksForTwoAxes(y1, y2, minTicks, maxTicks); // None
```

Returns `'None'` since it could not determine an alignment fitting those requirements.

## Development/Contributing

I, unfortunately, have decided to do this on windows.

1. https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows
  
  I chose to use nvm-windows.

  Current nvm latest: v18.6.0