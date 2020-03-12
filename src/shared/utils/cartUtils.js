export const cartChecker = (previousCart, itemToAdd) => {
  const existingItem = previousCart.find(item => item.id === itemToAdd.id);

  if (existingItem) {
    return previousCart.map(cart =>
      cart.id === itemToAdd.id ? { ...cart, quantity: cart.quantity + 1 } : cart
    );
  }
  return [...previousCart, { ...itemToAdd, quantity: 1 }];
};

export const cartCounter = cart => {
  if (cart.length) {
    return cart.reduce((accumulator, cart) => accumulator + cart.quantity, 0);
  } else return 0;
};

export const cartTotal = cart => {
  if (cart.length) {
    return cart.reduce(
      (accumulator, cart) => accumulator + cart.quantity * cart.price,
      0
    );
  } else return 0;
};
