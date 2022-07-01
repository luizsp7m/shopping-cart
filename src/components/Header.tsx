import { AiOutlineShoppingCart, AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export function Header() {
  const { wishlist } = useCart();

  const wishlistLength = wishlist.length;

  return (
    <header className="h-24 flex items-center justify-between">
      <Link to={"/"}>
        <h1 className="font-medium text-lg">Shopping Cart</h1>
      </Link>

      <div className="flex items-center gap-6">
        <Link to={"/wishlist"}>
          <div className="relative hover:opacity-75 transition-opacity">
            {wishlistLength > 0 && <span className="absolute w-5 h-5 rounded-full bg-red-500 flex justify-center items-center text-xs font-medium -right-3 -top-2">{wishlistLength}</span>}
            <AiOutlineHeart size={26} />
          </div>
        </Link>

        <Link to={"/cart"}>
          <AiOutlineShoppingCart size={26} />
        </Link>
      </div>
    </header>
  );
}