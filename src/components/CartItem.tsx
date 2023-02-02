import React from "react";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { formatCurrency } from "../utilities/formatCurrency";
import shopItems from "../data/items.json";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";

export function CartItem({ id, quantity }: { id: number; quantity: number }) {
  const { increaseItem, decreaseItem, removeItem, getItemQuantity } =
    useShoppingCart();

  const item = shopItems.find((i) => i.id === id);
  if (item == null) {
    return null;
  }

  return (
    <div className="flex bg-slate-200 p-1 rounded-md shadow-md items-center w-11/12 md:w-full mb-3">
      <img className="w-32 h-24 mr-3" src={item.imgUrl} />
      <div>
        <div>
          {item.name}
          <span className="text-slate-500 text-sm">
            {" "}
            x{getItemQuantity(id)}
          </span>
        </div>
        <div className="text-md text-slate-500 mb-2">
          {formatCurrency(item.price)}
        </div>
        <div className="flex flex-row">
          <button onClick={() => decreaseItem(id)} className="button primary">
            <AiOutlineMinus className="text-xs" />
          </button>
          <div className="text-md px-2">{quantity}</div>
          <button onClick={() => increaseItem(id)} className="button primary">
            <AiOutlinePlus className=" text-xs" />
          </button>
        </div>
      </div>
      <div className="ml-auto flex flex-row">
        <div className="text-xl text-slate-500 mr-2">
          {formatCurrency(item.price * quantity)}
        </div>
        <button
          onClick={() => removeItem(id)}
          className="button secondary justify-end"
        >
          <AiOutlineClose className=" text-sm" />
        </button>
      </div>
    </div>
  );
}
