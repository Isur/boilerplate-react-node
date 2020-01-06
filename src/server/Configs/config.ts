interface IConfig {
  secrets: ISecrets,

}

interface ISecrets {
  jwtSecret: string,
  sessionSecret: string,
}

const config: IConfig = {
  secrets: {
    jwtSecret: "Very safe secret is here. No one know what it is.",
    sessionSecret: "Our session is ultra safe. Don't you think?",
  },
};

export default config;
