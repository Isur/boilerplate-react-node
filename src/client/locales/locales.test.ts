import { LanguageDictionary } from "./locales";

describe("Locale test", () => {
  const ogLocation = window.location;
  beforeAll(() => {
    delete window.location;
    //@ts-ignore
    window.location = {
      pathname: "",
    };
  });

  afterAll(() => {
    window.location = ogLocation;
  });
  it("Should load correct language - en", () => {
    window.location.pathname = "/en/thanks";
    const lang = new LanguageDictionary();
    expect(lang.getDictionary().current).toBe("en");
  });

  it("Should load correct language - pl", () => {
    window.location.pathname = "/pl/thanks";
    const lang = new LanguageDictionary();
    expect(lang.getDictionary().current).toBe("pl");
  });

  it("Should load en language if wrong path", () => {
    window.location.pathname = "/gb/thanks";
    const lang = new LanguageDictionary();
    expect(lang.getDictionary().current).toBe("en");
  });

  it("Should load en language if no path", () => {
    window.location.pathname = "/";
    const lang = new LanguageDictionary();
    expect(lang.getDictionary().current).toBe("en");
  });

  it("Should load correct text", () => {
    window.location.pathname = "/";
    const lang = new LanguageDictionary();
    expect(lang.getDictionary().dictionary("test.eng-test")).toBe("ENGLISH TEST");
  });

  it("Should load text with # if no in translations", () => {
    window.location.pathname = "/";
    const lang = new LanguageDictionary();
    expect(lang.getDictionary().dictionary("test.eng-test-wrong")).toBe("#test.eng-test-wrong");
  });
});
