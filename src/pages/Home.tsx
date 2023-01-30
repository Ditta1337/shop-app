import React from "react";
import Navbar from "../components/Navbar";
import ShopItems from "../components/ShopItems";

export default function Home() {
  return (
    <div className="h-screen w-screen bg-slate-100">
      <Navbar />
      <ShopItems />
    </div>
  );
}
