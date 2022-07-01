import { Home } from "./pages/Home";
import { Wishlist } from "./pages/Wishlist";
import { Cart } from "./pages/Cart";
import { Route, Routes } from "react-router-dom";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}