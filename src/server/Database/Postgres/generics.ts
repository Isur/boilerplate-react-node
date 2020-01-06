/* eslint-disable @typescript-eslint/no-explicit-any */
import db, { paramsType } from "./db";

interface IData {
  [key: string]: any,
}

interface ICondition {
  where: string,
  params: paramsType[],
}

type Tables = string;

export const insert = async <T = any>(table: Tables, data: IData, returning?: string[]): Promise<T> => {
  const params: paramsType[] = [];
  let $ = "";

  const keys = Object.keys(data).map(key => {
    params.push(data[key]);
    $ += `$${params.length}, `;
    return key;
  })
    .join(", ");
  $ = $.slice(0, -2);

  const ret = returning ? `RETURNING ${returning.join(", ")}` : "";

  const returns = await db.queryFirst(`
    INSERT INTO
    ${table} (${keys})
    VALUES (${$})
    ${ret};
  `, params);

  return returns;
};

export const update = async <T = any>(table: Tables, data: IData, returning?: string[], condition?: ICondition): Promise<T> => {
  const params: paramsType[] = condition.params;
  const toUpdate = [];
  const ret = returning ? `RETURNING ${returning.join(", ")}` : "";
  for(const field of Object.keys(data)) {
    if(data[field] !== undefined) {
      params.push(data[field]);
      toUpdate.push(`${field} = $${params.length}`);
    }
  }
  const update = toUpdate.join(", ");
  const returns = await db.queryFirst(`
    UPDATE ${table}
    SET ${update}
    WHERE ${condition.where}
    ${ret}
  `, params);

  return returns;
};

export const find = async <T>(table: Tables, field: string, value: paramsType): Promise<T> => {
  const item = db.queryFirst(`
    SELECT * FROM ${table} WHERE ${field} = $1;
  `, [value]);
  return item;
};
