import { deepCopyMap } from "@/utils/deep-copy";
import React, { createContext } from "react";

type Cart = Map<string, number>;

type CartContext = {
  cart: Cart;
  addToCart: (productId: string, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
};

export const CartContext = createContext<CartContext>({
  cart: new Map(),
  addToCart: () => {},
  updateCartQuantity: () => {},
});

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<Cart>(new Map());

  const addToCart = (productId: string, quantity: number) => {
    const copyCart = deepCopyMap(cart);

    if (!copyCart.has(productId)) {
      copyCart.set(productId, 0);
    }
    copyCart.set(productId, copyCart.get(productId) ?? 0 + quantity);

    setCart(copyCart);
  };

  const updateCartQuantity = (productId: string, newQuantity: number) => {
    const copyCart = deepCopyMap(cart);

    if (!copyCart.has(productId)) return;

    if (newQuantity < 1) {
      copyCart.delete(productId);
    } else {
      copyCart.set(productId, newQuantity);
    }

    setCart(copyCart);
  };

  const context: CartContext = {
    cart,
    addToCart,
    updateCartQuantity,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};
