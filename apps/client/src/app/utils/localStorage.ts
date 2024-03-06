interface Item {
  key: string;
  value: string;
}

export const setItem = (item: Item) => {
  window.localStorage?.setItem(item.key, item.value);
};

export const getItem = (key: string): string | null => {
  return window.localStorage?.getItem(key);
};

export const removeItem = (key: string): void => {
  window.localStorage?.removeItem(key);
};
