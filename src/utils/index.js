const CART_KEY = "cart";

export const calculatePrice = (items) => {
  return `$${items
    .reduce((acc, item) => acc + item.quantity * item.price, 0)
    .toFixed(2)}`;
};

export const setCart = (value, key = CART_KEY) => {
  if (localStorage) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getCart = (key = CART_KEY) => {
  if (localStorage && localStorage.getItem(key)) {
    return JSON.parse(localStorage.getItem(key));
  }
};
