export const convertTimeOrDataFromLocalStorage = <T>(key: string): T => {
  let dateAsNum = null;
  if (key) {
    const extractedLocalStorage = localStorage.getItem(key);
    if (extractedLocalStorage) {
      dateAsNum =
        Number(extractedLocalStorage) || JSON.parse(extractedLocalStorage);
    }
  }
  return dateAsNum;
};
