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
  addProductToCart: (productId: string) => void;
  cart: {
    productId: string;
    amount: number;
  }[];
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const { data: products, loading: isLoadingProducts } = useGetProductsQuery();

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const storagedWishlist = localStorage.getItem("@shoppingcart:wishlist");

    if (storagedWishlist) {
      return JSON.parse(storagedWishlist);
    }

    return [];
  });

  const [cart, setCart] = useState<{
    productId: string;
    amount: number;
  }[]>(() => {
    const storagedCart = localStorage.getItem("@shoppingcart:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  function addProductToWishlist(productId: string) {
    const updateWishlist = [...wishlist];
    const exists = updateWishlist.indexOf(productId);

    if (exists >= 0) {
      updateWishlist.splice(exists, 1);
    } else {
      updateWishlist.push(productId);
    }

    localStorage.setItem("@shoppingcart:wishlist", JSON.stringify(updateWishlist));
    setWishlist(updateWishlist);
  }

  function addProductToCart(productId: string) {
    if (products) {
      const updateCart = [...cart];
      const product = products.products.find(product => product.id === productId);

      if(product?.amount === 0) return alert("Produto sem estoque");

      const exists = updateCart.findIndex(product => product.productId === productId);

      if(exists >= 0) {
        updateCart.splice(exists, 1);
      } else {
        updateCart.push({
          productId: productId,
          amount: 1,
        });
      }

      localStorage.setItem("@shoppingcart:cart", JSON.stringify(updateCart));
      setCart(updateCart);
    }
  }

  return (
    <CartContext.Provider value={{
      addProductToWishlist,
      wishlist,
      products,
      isLoadingProducts,
      addProductToCart,
      cart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}