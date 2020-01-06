import uuid from "uuid/v4";
import db from "../../Database/Postgres/db";
import { update } from "../../Database/Postgres/generics";

export interface IUserDB {
  username: string,
  email: string,
  password: string,
  apitoken: string,
  sessionid: string,
  id: string,
}

type userColumns = keyof IUserDB;

export const findUser = async (field: userColumns, value: string): Promise<IUserDB> => {
  const query = `SELECT * FROM users WHERE ${field} = $1`;
  const user = await db.queryFirst(`${query}`, [value]);
  return user;
};

export const findRegistrationUser = async (email: string, username: string): Promise<IUserDB> => {
  const query = `SELECT * FROM users WHERE email = $1 OR username = $2`;
  const user = await db.queryFirst(query, [email, username]);
  return user;
};

export const getUsers = async (): Promise<IUserDB[]> => {
  const users: IUserDB[] = await db.queryAll(`
    SELECT * FROM users;
  `);
  users.forEach(user => {
    delete user.password;
  });
  return users;
};

export const adduser = async (userData: Partial<IUserDB>): Promise<string> => {
  const { id } = await db.queryFirst(`
    INSERT INTO users(id, username, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `, [uuid(), userData.username, userData.email, userData.password]);
  return id;
};

export const updateUser = async (userData: Partial<IUserDB>, id: string): Promise<string> => {
  const up = await update<{id: string}>("users", {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    sessionid: userData.sessionid,
    apitoken: userData.apitoken,
  }, ["id"], { where: `id = $1`, params: [id] });
  return up.id;
};

export const destroySession = async (sessionid: string) => {
  await db.queryFirst(`
    UPDATE users
    SET sessionid = NULL
    WHERE sessionid = $1`, [sessionid]);
};
