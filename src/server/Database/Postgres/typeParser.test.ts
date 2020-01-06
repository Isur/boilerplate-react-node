import { postgresIntervalToString } from "./typesParser";

describe("Postgres Interval To String", () => {
  const pgInterval = {
    years: 2,
    months: 2,
    days: 2,
    hours: 2,
    minutes: 2,
    seconds: 2,
    milliseconds: 2,
  };
  it("Should return correct age for years precision", () => {
    const res = postgresIntervalToString(pgInterval, "years");
    const exp = "2 years";
    expect(res).toBe(exp);
  });
  it("Should return correct age for months precision", () => {
    const res = postgresIntervalToString(pgInterval, "months");
    const exp = "2 years 2 months";
    expect(res).toBe(exp);
  });
  it("Should return correct age for days precision", () => {
    const res = postgresIntervalToString(pgInterval, "days");
    const exp = "2 years 2 months 2 days";
    expect(res).toBe(exp);
  });
  it("Should return correct age for hours precision", () => {
    const res = postgresIntervalToString(pgInterval, "hours");
    const exp = "2 years 2 months 2 days 2 hours";
    expect(res).toBe(exp);
  });
  it("Should return correct age for minutes precision", () => {
    const res = postgresIntervalToString(pgInterval, "minutes");
    const exp = "2 years 2 months 2 days 2 hours 2 minutes";
    expect(res).toBe(exp);
  });
  it("Should return correct age for seconds precision", () => {
    const res = postgresIntervalToString(pgInterval, "seconds");
    const exp = "2 years 2 months 2 days 2 hours 2 minutes 2 seconds";
    expect(res).toBe(exp);
  });
  it("Should return correct age for milliseconds precision", () => {
    const res = postgresIntervalToString(pgInterval, "milliseconds");
    const exp = "2 years 2 months 2 days 2 hours 2 minutes 2 seconds 2 milliseconds";
    expect(res).toBe(exp);
  });
  const pgInterval2 = {
    minutes: 2,
    seconds: 2,
    milliseconds: 2,
  };
  it("Should return correct age for milliseconds precision without full object data ", () => {
    const res = postgresIntervalToString(pgInterval2, "milliseconds");
    const exp = "2 minutes 2 seconds 2 milliseconds";
    expect(res).toBe(exp);
  });
});
