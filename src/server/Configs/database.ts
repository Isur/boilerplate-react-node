interface IDatabaseConfig {
  user: string,
  host: string,
  database: string,
  password: string,
  port: number,
  ssl?:  boolean,
}

const dbConfigProduction: IDatabaseConfig = {
  user: process.env.DATABASE_USER || "boilerplate",
  host: process.env.DATABASE_HOST || "localhost",
  database: process.env.DATABASE_NAME || "boilerplate",
  password: process.env.DATABASE_PASSWORD || "boilerplate",
  port: 5432,
  ssl: true,
};

const dbConfigLocal: IDatabaseConfig = {
  user: "boilerplate",
  host: "localhost",
  database: "boilerplate",
  password: "boilerplate",
  port: 5432,
};

export default process.env.NODE_ENV === "production" ? dbConfigProduction : dbConfigLocal;
