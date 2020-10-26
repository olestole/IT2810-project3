import React from 'react';

const sum = (a: number, b: number) => {
  return a + b;
};

it('sums numbers', () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(2, 2)).toEqual(4);
});
