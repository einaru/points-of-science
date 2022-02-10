import { clickStreamItemCreator, node } from "../../../src/internal.js";

let emptyClickStreamItem;
let nextValue;
let prevValue;
let insertValue;

beforeAll(async () => {
  emptyClickStreamItem = clickStreamItemCreator();
  nextValue = {
    id: "1",
    screenID: "1",
    timestamp: "0000-00-00T00:00:00.000Z",
  };
  prevValue = {
    id: "2",
    screenID: "2",
    timestamp: "0000-00-00T00:00:00.000Z",
  };
  insertValue = {
    id: "3",
    screenID: "10",
    timestamp: "0000-00-00T00:00:00.000Z",
  };
});

test("Create an empty click stream item", () => {
  const result = clickStreamItemCreator();
  expect(JSON.stringify(result)).toEqual(JSON.stringify(emptyClickStreamItem));
});

test("Add click stream item.", () => {
  emptyClickStreamItem.append(nextValue);
  const expectedResult = 2;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of appended click stream item.", () => {
  const expectedResult = node(nextValue).value;
  const result = emptyClickStreamItem.data.tail.value;
  expect(result).toEqual(expectedResult);
});

test("Prepend click stream item.", () => {
  emptyClickStreamItem.prepend(prevValue);
  const expectedResult = 3;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of prepended click stream item.", () => {
  const expectedResult = node(prevValue).value;
  const result = emptyClickStreamItem.data.head.value;
  expect(result).toEqual(expectedResult);
});

test("Insert click stream item", () => {
  emptyClickStreamItem.insert(1, emptyClickStreamItem, insertValue);
  const expectedResult = 4;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of inserted click stream item.", () => {
  const expectedResult = node(insertValue).value;
  const result = emptyClickStreamItem.data.head.nextItem.value;
  expect(result).toEqual(expectedResult);
});

test("Insert click stream item on first position", () => {
  insertValue.id = "4";
  emptyClickStreamItem.insert(0, emptyClickStreamItem, insertValue);
  const expectedResult = 5;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of inserted click stream item on first position.", () => {
  const expectedResult = node(insertValue).value;
  const result = emptyClickStreamItem.data.head.value;
  expect(result).toEqual(expectedResult);
});

test("Insert click stream item on non existing index", () => {
  expect(() =>
    emptyClickStreamItem.insert(30, emptyClickStreamItem, insertValue)
  ).toThrow(Error);
});

test("Insert click stream item in last position", () => {
  insertValue.id = "5";
  emptyClickStreamItem.insert(
    emptyClickStreamItem.data.size,
    emptyClickStreamItem,
    insertValue
  );
  const expectedResult = 6;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of inserted click stream item in last position.", () => {
  const expectedResult = node(insertValue).value;
  const result = emptyClickStreamItem.data.head.value;
  expect(result).toEqual(expectedResult);
});

test("Remove click stream item", () => {
  emptyClickStreamItem.remove(1);
  const expectedResult = 5;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of removed click stream item.", () => {
  const expectedResult = node(insertValue).value;
  const result = emptyClickStreamItem.data.head.value;
  expect(result).toEqual(expectedResult);
});

test("Remove click stream item on first position", () => {
  insertValue.id = "4";
  emptyClickStreamItem.remove(0);
  const expectedResult = 4;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of removed click stream item on first position.", () => {
  const expectedResult = node(insertValue).value;
  const result = emptyClickStreamItem.data.head.value;
  expect(result).toEqual(expectedResult);
});

test("Remove click stream item on non existing index", () => {
  expect(() =>
    emptyClickStreamItem.remove(30, emptyClickStreamItem, insertValue)
  ).toThrow(Error);
});

test("Remove click stream item in last position", () => {
  insertValue.id = "5";
  emptyClickStreamItem.remove(emptyClickStreamItem.data.size - 1);
  const expectedResult = 3;
  const result = emptyClickStreamItem.data.size;
  expect(result).toEqual(expectedResult);
});

test("Check value of removed click stream item in last position.", () => {
  const expectedResult = null;
  const result = emptyClickStreamItem.data.tail.nextItem;
  expect(result).toEqual(expectedResult);
});
