// eslint-disable-next-line
module.exports = {
  errorOnDeprecated: true,
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
  ],
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  moduleFileExtensions: [
    "ts", "tsx",
    "js", "jsx",
    "json", "node",
  ],
  coverageDirectory: "<rootDir>/coverage/",
  displayName: {
    name: "Boilerplate",
    color: "red",
  },
  verbose: true,
};
