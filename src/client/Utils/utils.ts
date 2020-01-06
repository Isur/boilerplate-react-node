export const sleep = (ms: number) => {
  return new Promise(resolve => {
    setTimeout(() => { resolve(); }, ms);
  });
};

export const isBiggerDate = (date1: string, date2: string): boolean => {
  const asDate1 = Date.parse(date1);
  const asDate2 = Date.parse(date2);
  return asDate1 > asDate2;
};

export const arrayIncludesNumber = (array: (number | string)[], inc: number|string): boolean => {
  const num = parseInt(inc as string);
  const str = inc.toString();
  for(let i = 0; i < array.length; i++) {
    if(array[i] === num || array[i] === str) return true;
  }

  return false;
};

interface ICountableElement {
  text: string,
  value: number,
}

export const arrayToCountable = (arr: (string | number)[]): ICountableElement[] => {
  const calculated = arr.reduce((prev, curr) => {
    const item = prev.find(i => i.text === curr);
    if(item) {
      item.value = item.value + 1;
    } else {
      prev.push({
        text: curr,
        value: 1,
      });
    }
    return prev;
  }, []);
  return calculated;
};
