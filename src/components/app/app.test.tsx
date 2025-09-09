/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
global.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve('hey') }));

function sum(a: number, b: number) {
  return a + b;
}

test('Example test', async () => {
  expect(sum(1, 2)).toEqual(3);
});

