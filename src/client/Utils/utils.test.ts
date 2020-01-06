import { isBiggerDate, sleep, arrayIncludesNumber, arrayToCountable } from "./utils";

describe("Date compare", () => {
  const date1 = "2019-11-05T00:12";
  const date2 = "2019-12-05T00:20";
  const date3 = "2019-12-05T00:20";
  it("Should compare correctly - lower", () => {
    const result = isBiggerDate(date1, date2);
    expect(result).toBe(false);
  });
  it("Should compare correctly - bigger", () => {
    const result = isBiggerDate(date2, date1);
    expect(result).toBe(true);
  });
  it("Should compare correctly - same", () => {
    const result = isBiggerDate(date3, date2);
    expect(result).toBe(false);
  });
});

describe("Sleep", () => {
  it("Should return promise", async () => {
    expect.assertions(1);
    return expect(sleep(100)).resolves.toBe(undefined);
  });
});

describe("Number in array test", () => {
  const arrInts = [2, 3, 1, 6, 5, 4];
  const arrStrs = ["2", "3", "1", "6", "5", "4"];
  const number = 3;
  const string = "3";
  const failNumber = 17;
  const failString = "17";
  it("Should return true for int in arr of ints", () => {
    const result = arrayIncludesNumber(arrInts, number);
    expect(result).toBe(true);
  });

  it("Should return true for string in arr of strings", () => {
    const result = arrayIncludesNumber(arrStrs, string);
    expect(result).toBe(true);
  });

  it("Should return true for int in arr of strings", () => {
    const result = arrayIncludesNumber(arrStrs, number);
    expect(result).toBe(true);
  });

  it("Should return true for string in arr of ints", () => {
    const result = arrayIncludesNumber(arrInts, string);
    expect(result).toBe(true);
  });

  it("Should return false for int in arr of ints", () => {
    const result = arrayIncludesNumber(arrInts, failNumber);
    expect(result).toBe(false);
  });

  it("Should return false for string in arr of strings", () => {
    const result = arrayIncludesNumber(arrStrs, failString);
    expect(result).toBe(false);
  });

  it("Should return false for int in arr of strings", () => {
    const result = arrayIncludesNumber(arrStrs, failNumber);
    expect(result).toBe(false);
  });

  it("Should return false for string in arr of ints", () => {
    const result = arrayIncludesNumber(arrInts, failString);
    expect(result).toBe(false);
  });
});

describe("Countable Array", () => {
  const arr = ["test", "test", "test", "another", "simple", "another"];
  const calculated = [{
    text: "test",
    value: 3,
  }, {
    text: "another",
    value: 2,
  }, {
    text: "simple",
    value: 1,
  }];

  it("Should calculate correclty", () => {
    const result = arrayToCountable(arr);
    expect(result).toStrictEqual(calculated);
  });
});
