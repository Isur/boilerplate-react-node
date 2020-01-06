import axios from "axios";

type requestTypes = "POST" | "GET" | "PATCH" | "DELETE";

interface IApiRequest {
  method: requestTypes,
  url: string,
  data?: unknown,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const request = async <T = any>({ method, url, data }: IApiRequest): Promise<T> => {
  const options = {
    method,
    url,
    data,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  try {
    const response = await axios(options);
    return response.data;
  } catch(e) {
    throw e.response.data;
  }
};

export default request;
