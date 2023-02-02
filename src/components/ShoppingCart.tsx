import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { formatCurrency } from "../utilities/formatCurrency";
import { CartItem } from "./CartItem";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function ShoppingCart({ isOpen }: { isOpen: boolean }) {
  const { closeCart, cartItems, cartQuantity, getTotalPrice } = useShoppingCart();

  return (
    <div className="relative bg-white">
      <button
        onClick={closeCart}
        className={`fixed bottom-0 top-0 w-full bg-gray-500 bg-opacity-40 ease-out duration-500 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      />
      <div
        className={`fixed border-solid border-l-2 border-sky-300 right-0 bottom-0 top-0  md:w-2/3 w-full bg-white p-4 overflow-y-auto transition-all ease-out duration-500 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        id="cart"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Cart</h2>
          <button onClick={closeCart} className="text-2xl font-bold">
            <AiOutlineClose />
          </button>
        </div>
        <div className="flex flex-col items-center mb-6">
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
        </div>
        <div className="flex flex-col items-center">
          <div className="text-slate-500 text-3xl mb-3">Total: {formatCurrency(getTotalPrice())}</div>
          {cartQuantity ? <button className="button primary justify-items-center">Checkout</button> : <></>}
        </div>
      </div>
    </div>
  );
}
