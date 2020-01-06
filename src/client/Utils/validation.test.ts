import { LanguageDictionary } from "../locales/locales";
import { validateLength, validateDate, validatePassword } from "./validation";

describe("Validation test", () => {
  const lang = new LanguageDictionary();
  window.lang = lang.getDictionary();
  describe("Validate Length", () => {
    const str = "This is sample test.";
    it("Should be positive with min/max", () => {
      const min = 2;
      const max = 25;
      const result = validateLength(str, { min, max });
      expect(result).toBe(true);
    });
    it("Should be negative with min/max", () => {
      const min = 2;
      const max = 10;
      const result = validateLength(str, { min, max });
      expect(result).toBe(false);
    });
    it("Should be positive with max", () => {
      const max = 40;
      const result = validateLength(str, { max });
      expect(result).toBe(true);
    });
    it("Should be negative with min", () => {
      const min = 40;
      const result = validateLength(str, { min });
      expect(result).toBe(false);
    });
  });
  describe("Validate date", () => {
    const correctDate = "2019-11-05T00:12";
    const incorrectDate = "2019-13-05T00:20";
    it("Should validate correct dates", () => {
      const result = validateDate(correctDate);
      expect(result).toBe(true);
    });
    it("Should validate incorrect dates", () => {
      const result = validateDate(incorrectDate);
      expect(result).toBe(false);
    });
  });
  describe("Validate password", () => {
    const correct = "Test@1234!";
    const len = "test";
    const letter = "123456789";
    const big = "testtesttest";
    const number = "testTestteST";
    const special = "test1234Taw";
    it("Should validate correct password", () => {
      const result = validatePassword(correct);
      expect(result).toBe(true);
    });
    it("Should validate incorrect password - length", () => {
      const result = validatePassword(len);
      expect(result).toBe(false);
    });
    it("Should validate incorrect password - letter", () => {
      const result = validatePassword(letter);
      expect(result).toBe(false);
    });
    it("Should validate incorrect password - big letter", () => {
      const result = validatePassword(big);
      expect(result).toBe(false);
    });
    it("Should validate incorrect password - number", () => {
      const result = validatePassword(number);
      expect(result).toBe(false);
    });
    it("Should validate incorrect password - special", () => {
      const result = validatePassword(special);
      expect(result).toBe(false);
    });
  });
});
