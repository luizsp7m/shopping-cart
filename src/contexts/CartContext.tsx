import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { GetProductsQuery, useGetProductByIdQuery, useGetProductsQuery } from "../graphql/generated";

interface CartProviderProps {
  children: ReactNode;
}

interface CartContextData {
  data: GetProductsQuery | undefined;
  loading: boolean;
  wishlist: Array<WishlistProps>;
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  cart: Array<CartProps>;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  addAmountInCart: (props: CartProps) => void;
  removeAmountInCart: (props: CartProps) => void;
}

interface WishlistProps {
  productId: string;
}

interface CartProps {
  productId: string;
  amountInCart: number;
}

export const CartContext = createContext({} as CartContextData);

export function CartProvider({ children }: CartProviderProps) {
  const { data, loading } = useGetProductsQuery();

  const [wishlist, setWishlist] = useState<WishlistProps[]>(() => {
    const storagedWishlist = localStorage.getItem("@shopping-cart:wishlist");

    if (storagedWishlist) {
      return JSON.parse(storagedWishlist);
    }

    return [];
  });

  const [cart, setCart] = useState<CartProps[]>(() => {
    const storagedCart = localStorage.getItem("@shopping-cart:cart");

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addToWishlist = (productId: string) => {
    const updateWishlist = [...wishlist];
    updateWishlist.push({ productId });
    localStorage.setItem("@shopping-cart:wishlist", JSON.stringify(updateWishlist));
    setWishlist(updateWishlist);
  }

  const removeFromWishlist = (productId: string) => {
    const updateWishlist = [...wishlist];
    const productIndex = updateWishlist.findIndex(product => product.productId === productId)
    updateWishlist.splice(productIndex, 1);
    localStorage.setItem("@shopping-cart:wishlist", JSON.stringify(updateWishlist));
    setWishlist(updateWishlist);
  }

  const addToCart = (productId: string) => {
    const product = data?.products.find(product => product.id === productId);

    if (!product) return;

    if (product.amountInStock <= 0) return alert("Produto fora de estoque");

    const updateCart = [...cart];
    updateCart.push({ productId, amountInCart: 1 });
    localStorage.setItem("@shopping-cart:cart", JSON.stringify(updateCart));
    setCart(updateCart);
  }

  const removeFromCart = (productId: string) => {
    const updateCart = [...cart];
    const productIndex = updateCart.findIndex(product => product.productId === productId);
    updateCart.splice(productIndex, 1);
    localStorage.setItem("@shopping-cart:cart", JSON.stringify(updateCart));
    setCart(updateCart);
  }

  const addAmountInCart = (props: CartProps) => {
    const product = data?.products.find(product => product.id === props.productId);

    if (!product) return;

    if (props.amountInCart + 1 > product.amountInStock) return alert("Produto fora de estoque");

    const updateCart = [...cart];
    const productIndex = updateCart.findIndex(item => item.productId === props.productId);
    updateCart[productIndex].amountInCart = props.amountInCart + 1;
    localStorage.setItem("@shopping-cart:cart", JSON.stringify(updateCart));
    setCart(updateCart);
  }

  const removeAmountInCart = (props: CartProps) => {
    const product = data?.products.find(product => product.id === props.productId);

    if (!product) return;

    if (props.amountInCart - 1 < 1) return;

    const updateCart = [...cart];
    const productIndex = updateCart.findIndex(item => item.productId === props.productId);
    updateCart[productIndex].amountInCart = props.amountInCart - 1;
    localStorage.setItem("@shopping-cart:cart", JSON.stringify(updateCart));
    setCart(updateCart);
  }

  return (
    <CartContext.Provider value={{
      data,
      loading,
      wishlist,
      addToWishlist,
      removeFromWishlist,
      cart,
      addToCart,
      removeFromCart,
      addAmountInCart,
      removeAmountInCart,
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}