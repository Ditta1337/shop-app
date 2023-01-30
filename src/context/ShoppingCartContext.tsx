import { createContext, useContext, useState } from "react";

type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
};

type CartItem = {
  id: number;
  quantity: number;
};

const ShoppingCartContext = createContext({} as ShoppingCartContextType);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  }

  function increaseItem(id: number) {
    setCartItems((currItems) => {
      console.log("increaseItem triggered", id);
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            item.quantity++;
          }
          return item;
        });
      }
    });
  }

  function decreaseItem(id: number) {
    setCartItems((currItems) => {
      console.log("increaseItem triggered", id);
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            item.quantity--;
          }
          return item;
        });
      }
    });
  }

  function removeItem(id: number) {
    setCartItems((currItems) => {
      console.log("removeItem triggered", id);
      return currItems.filter((item) => item.id !== id);
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{ getItemQuantity, increaseItem, decreaseItem, removeItem }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}
