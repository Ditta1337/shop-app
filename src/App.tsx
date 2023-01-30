import React from "react";
import { Route, Routes } from "react-router-dom";
import { ShoppingCartProvider } from "./context/ShoppingCartContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
  return (
    <ShoppingCartProvider>
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Home />
          </React.Suspense>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ShoppingCartProvider>
  );
}

