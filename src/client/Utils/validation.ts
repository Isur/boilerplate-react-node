import { TypeGuard } from "../../server/Utils/utils";

export const validateLength = (str: string, { max, min }: { max?: number, min?: number }) => {
  if(min && str.length < min) return false;
  if(max && str.length > max) return false;
  return true;
};

export const validateDate = (str: string): boolean => {
  const date = new Date(str).toString();
  return !isNaN(Date.parse(date));
};

export const validatePassword = (str: string): boolean => {
  const letter = /(?=.*[a-z])/;
  const bigLetter = /(?=.*[A-Z])/;
  const number = /(?=.*\d)/;
  const special = /(?=.*[@$!%*?&])/;
  const length = /^[A-Za-z\d@$!%*?&]{8,}$/;
  if(!length.test(str)) return false;
  if(!letter.test(str)) return false;
  if(!bigLetter.test(str)) return false;
  if(!number.test(str)) return false;
  if(!special.test(str)) return false;
  return true;
};

interface IError {
  [key: string]: string,
}
