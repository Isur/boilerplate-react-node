export const findMaxInObject = <T>(arr: T[], field: keyof T): number => {
  const fields = arr.map(object => object[field]);
  if(fields.length === 0) return 0;
  if(!TypeGuard(fields[0], "number")) {
    throw new Error("NaN");
  }
  let max = fields[0];
  fields.forEach(item => {
    if(item > max) max = item;
  });
  return Number(max);
};

export const TypeGuard = <T>(object: T, className: string): object is T => {
  return typeof object === className;
};

const emptyStringToNull = (field: string) => { return field ? field : null; };

/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export const nullableStringsInObjects = (obj: any) => {
  if(obj === false) return false;
  if(!obj) return;
  const keys = Object.keys(obj);
  keys.forEach(key => {
    if(TypeGuard(obj[key], "string")) {
      obj[key] = emptyStringToNull(obj[key]);
    } else {
      obj[key] = nullableStringsInObjects(obj[key]);
    }
  });
  return obj;
};
