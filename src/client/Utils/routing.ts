import { StoreConfig } from "../Redux/store";

const routes = {
  pages: {
    home: "/",
    login: "/login",
    register: "/register",
  },
  api: {
    login: "/users/login",
    register: "/users/register",
    logout: "/users/logout",
    getLocalUser: "/users/me",
  },
};

// eslint-disable-next-line
const pages: typeof routes.pages = new Proxy(routes.pages, { get(target: any, name) {
  return `/${lang.current}${target[name]}`;
} });

// eslint-disable-next-line
const api: typeof routes.api = new Proxy(routes.api, { get(target: any, name) {
  return  `/api${target[name]}`;
} });

export default { pages, api };
