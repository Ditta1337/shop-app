import React from "react";
import shopItems from "../data/items.json";
import Item from "./Item";


export default function ShopItems() {
  return (
    <div className="grid grid-flow-row gap-4 mx-10 lg:grid-cols-3 mt-10 md:grid-cols-2 sm:grid-cols-1">
      {shopItems.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
