/* eslint-disable @typescript-eslint/no-explicit-any */
import { findMaxInObject, nullableStringsInObjects } from "./utils";

describe("Utils test", () => {
  const arr = [
    { id: 3, text: "" },
    { id: 4, text: "" },
    { id: 5, text: "" },
    { id: 13, text: "" },
    { id: 7, text: "" },
  ];
  const correct = 13;
  describe("Find max in array of objects", () => {
    it("Should find max - correct", () => {
      const result = findMaxInObject<{id: number, text: string}>(arr, "id");
      expect(result).toBe(correct);
    });
    it("Should find max - fail", () => {
      expect(() => {
        findMaxInObject<{id: number, text: string}>(arr, "text");
      }).toThrow("NaN");
    });
    it("Should return 0 if empty array", () => {
      const result = findMaxInObject([], "id");
      expect(result).toBe(0);
    });
  });

  describe("Nullable Strings In Objects", () => {
    const correctObject = {
      a: false,
      b: "string  test",
      c: true,
    };
    const correctNested = {
      a: "string",
      b: {
        ba: "string",
        bb: "string",
        bc: {
          bca: false,
        },
      },
    };

    const nullableObject = {
      a: "",
      b: "string",
      c: "",
    };

    const correctNullable: any = {
      a: null,
      b: "string",
      c: null,
    };

    const nullableNested = {
      a: "",
      b: {
        ba: "string",
        bb: "",
        bc: {
          bca: "",
        },
      },
    };

    const nullableNestedCorrect: any = {
      a: null,
      b: {
        ba: "string",
        bb: null,
        bc: {
          bca: null,
        },
      },
    };
    it("should handle correct object", () => {
      const result = nullableStringsInObjects(correctObject);
      expect(result).toStrictEqual(correctObject);
    });

    it("should handle correct nested object", () => {
      const result = nullableStringsInObjects(correctNested);
      expect(result).toStrictEqual(correctNested);
    });

    it("should parse correctly", () => {
      const result = nullableStringsInObjects(nullableObject);
      expect(result).toStrictEqual(correctNullable);
    });

    it("should parse correctly nested", () => {
      const result = nullableStringsInObjects(nullableNested);
      expect(result).toStrictEqual(nullableNestedCorrect);
    });

    it("Should hanlde nulls", () => {
      const result = nullableStringsInObjects(nullableNestedCorrect);
      expect(result).toStrictEqual(nullableNestedCorrect);
    });

    it("Should hanlde nulls", () => {
      const result = nullableStringsInObjects(null);
      expect(result).toStrictEqual(undefined);
    });
  });
});
