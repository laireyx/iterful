import Iterful from "../dist/index.js";
import { createRandomArray } from "./arr.js";

test("fromArray", () => {
  const arr = createRandomArray(1024);

  const itf = Iterful.fromArray(arr);
  expect(itf.toArray()).toStrictEqual(arr);
});

test("map", () => {
  const arr = createRandomArray(1024);
  const answerArr = arr.map((x) => x * 2);

  const itf = Iterful.fromArray(arr);
  expect(itf.map((x) => x * 2).toArray()).toStrictEqual(answerArr);
});

test("filter", () => {
  const arr = createRandomArray(1024);
  const answerArr = arr.filter((x) => x < 32768);

  const itf = Iterful.fromArray(arr);
  expect(itf.filter((x) => x < 32768).toArray()).toStrictEqual(answerArr);
});

test("reduce (with init)", () => {
  const arr = createRandomArray(1024);
  const answer = arr.reduce((x, y) => x + y);

  const itf = Iterful.fromArray(arr);
  expect(itf.reduce((x, y) => x + y, 0)).toStrictEqual(answer);
});

test("reduce (without init)", () => {
  const arr = createRandomArray(1024);
  const answer = arr.reduce((x, y) => x + y);

  const itf = Iterful.fromArray(arr);
  expect(itf.reduce((x, y) => x + y)).toStrictEqual(answer);
});
