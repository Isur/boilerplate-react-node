import { Pool } from "pg";
import databaseConfig from "../../Configs/database";
import migrate from "./migration";

const pool = new Pool(databaseConfig);

migrate(pool).catch(console.error);

export type paramsType = string | number | string[] | number[];

export default {
  query: async (query: string, params?: paramsType[]) => pool.query(query, params),
  queryFirst: async (query: string, params?: paramsType[]) => {
    const { rows } = await pool.query(query, params);
    return rows[0];
  },
  queryAll: async (query: string, params?: paramsType[]) => {
    const { rows } = await pool.query(query, params);
    return rows;
  },
};

