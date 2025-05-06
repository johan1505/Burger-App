import { deepCopyMap } from "@/utils/deep-copy";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@tanstack/react-query";
import React, { createContext, useEffect } from "react";

type Cart = Map<string, number>;

type CartContext = {
  cart: Cart;
  addToCart: (productId: string, quantity: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
};
const STORAGE_KEY = "user_cart";

export const CartContext = createContext<CartContext>({
  cart: new Map(),
  addToCart: () => {},
  clearCart: () => {},
  updateCartQuantity: () => {},
});

const serializeCart = (cart: Cart) => {
  const cartArray = Array.from(cart.entries());
  return JSON.stringify(cartArray);
};

const deserializeCart = (data: string): Cart => {
  return new Map(JSON.parse(data));
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = React.useState<Cart>(new Map());

  const { data, isSuccess } = useQuery({
    queryFn: () => AsyncStorage.getItem(STORAGE_KEY),
    queryKey: ["get-cart"],
  });

  const { mutate: saveCart } = useMutation({
    mutationFn: () => AsyncStorage.setItem(STORAGE_KEY, serializeCart(cart)),
    mutationKey: ["update-cart"],
  });

  useEffect(() => {
    if (isSuccess && data) {
      setCart(deserializeCart(data));
    }
  }, [data, isSuccess]);

  useEffect(() => {
    saveCart();
  }, [cart]);

  const addToCart = (productId: string, quantity: number) => {
    const copyCart = deepCopyMap(cart);

    if (!copyCart.has(productId)) {
      copyCart.set(productId, 0);
    }

    copyCart.set(
      productId,

      (copyCart.get(productId) ?? 0) + quantity
    );

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

  const clearCart = () => setCart(new Map());

  const context: CartContext = {
    cart,
    addToCart,
    clearCart,
    updateCartQuantity,
  };

  return (
    <CartContext.Provider value={context}>{children}</CartContext.Provider>
  );
};
