import jwt from "jsonwebtoken";
import uuid from "uuid/v4";
import { HTTPError } from "../../Utils/HTTPError";
import { hashData, compareHash } from "../../Utils/bcrypt";
import appConfig from "../../Configs/config";
import * as userRepository from "./userRepository";

export interface IUser {
  username: string,
  email: string,
  id: string,
}

interface ICreateUser {
  username: string,
  email: string,
  password: string,
  passwordConfirm: string,
}

type findBy = keyof IUser;

export const createUser = async (userData: ICreateUser): Promise<string> => {
  if(await accountExists(userData.username, userData.email)) throw new HTTPError(400, "User already exists!");
  if(userData.password !== userData.passwordConfirm) throw new HTTPError(400, "Passwords doesn't match!");
  const hash = await hashData(userData.password);
  const id = await userRepository.adduser({
    email: userData.email,
    username: userData.username,
    password: hash,
  });
  return id;
};

interface ILoginUser {
  username: string,
  password: string,
}

export const loginUser = async (userData: ILoginUser): Promise<{token: string, user: IUser}> => {
  const user = await getUser("username", userData.username);
  if(!user) throw new HTTPError(404, "User not found!");
  if(await compareHash(userData.password, user.password) === false) throw new HTTPError(401, "Wrong credentials!");
  const token = user.sessionid || uuid();
  await userRepository.updateUser({ sessionid: token }, user.id);
  const authToken = generateAuthToken(token);
  delete user.password;
  return { user, token: authToken };
};

const generateAuthToken = (sessionid: string): string => {
  return jwt.sign({ sessionid }, appConfig.secrets.jwtSecret, { expiresIn: "10h" });
};

export const getUser = async (field: findBy, value: string): Promise<userRepository.IUserDB> => {
  const user = await userRepository.findUser(field, value);
  return user;
};

const accountExists = async (username: string, email: string): Promise<boolean> => {
  const inUse = await userRepository.findRegistrationUser(email, username);
  return !!inUse;
};
