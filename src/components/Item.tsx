import React from "react";
import { formatCurrency } from "../utilities/formatCurrency";
import { useShoppingCart } from "../context/ShoppingCartContext";


export default function Item({
  item,
}: {
  item: {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
  };
}) {
  const { getItemQuantity, increaseItem, decreaseItem, removeItem } = useShoppingCart();
  const quantity = getItemQuantity(item.id);

  return (
    <div className="flex flex-col rounded-md shadow-md bg-slate-200 items-center pb-3">
      <img src={item.imgUrl} />
      <div className="flex justify-between w-full px-3 mb-3">
        <div className=" text-2xl">{item.name}</div>
        <div className=" text-xl self-end text-slate-700">
          {formatCurrency(item.price)}
        </div>
      </div>
      <div>
        {quantity === 0 ? (
          <button onClick={() => increaseItem(item.id)} className="button primary">
            Add to cart
          </button>
        ) : (
          <div>
            <div className="flex">
              <button onClick={() => decreaseItem(item.id)} className="button primary">-</button>
              <div className="text-2xl px-2">{quantity} in cart</div>
              <button onClick={() => increaseItem(item.id)} className="button primary">+</button>
            </div>
            <button onClick={() => removeItem(item.id)} className="button secondary mx-auto">
              Remove from cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
