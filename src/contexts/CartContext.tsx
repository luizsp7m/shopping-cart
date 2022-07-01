import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { GetProductsQuery, useGetProductsQuery } from "../graphql/generated";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  addProductToWishlist: (productId: string) => void;
  wishlist: string[];
  products: GetProductsQuery | undefined;
  isLoadingProducts: boolean;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const { data: products, loading: isLoadingProducts } = useGetProductsQuery();

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const storagedWishlist = localStorage.getItem("@shoppingcart:cart");

    if (storagedWishlist) {
      return JSON.parse(storagedWishlist);
    }

    return [];
  });
  
  const [cart, setCart] = useState<string[]>([]);

  function addProductToWishlist(productId: string) {
    const updateWishlist = [...wishlist];
    const exists = updateWishlist.indexOf(productId);

    if (exists >= 0) {
      updateWishlist.splice(exists, 1);
    } else {
      updateWishlist.push(productId);
    }

    localStorage.setItem("@shoppingcart:cart", JSON.stringify(updateWishlist));
    setWishlist(updateWishlist);
  }

  return (
    <CartContext.Provider value={{
      addProductToWishlist,
      wishlist,
      products,
      isLoadingProducts,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}