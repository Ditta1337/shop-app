import { createContext, useContext, useState } from "react";
import shopItems from "../data/items.json";
import { ShoppingCart } from "../components/ShoppingCart";

type ShoppingCartContextType = {
  getItemQuantity: (id: number) => number;
  increaseItem: (id: number) => void;
  decreaseItem: (id: number) => void;
  removeItem: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
  getTotalPrice: () => number;
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
  const [isOpen, setIsOpen] = useState(true);

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

  const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
  
  const openCart = () => setIsOpen(true);

  const closeCart = () => setIsOpen(false);

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = shopItems.find((i) => i.id === item.id)?.price;
      if (itemPrice) {
        return total + itemPrice * item.quantity;
      }
      return total;
    }, 0);
  };



  return (
    <ShoppingCartContext.Provider
      value={{ getItemQuantity, increaseItem, decreaseItem, removeItem, cartItems, cartQuantity, openCart, closeCart, getTotalPrice }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  );
}
