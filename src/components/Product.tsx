import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { BsCart, BsCartFill } from "react-icons/bs";
import { useCart } from "../contexts/CartContext";

interface Props {
  product: {
    id: string;
    title: string;
    price: number;
    amountInStock: number;
    image: {
      url: string;
    }
  }
}

export function Product({ product }: Props) {
  const { wishlist, addToWishlist, removeFromWishlist, cart, addToCart, removeFromCart } = useCart();

  const existsInWishlist = wishlist.find(item => item.productId === product.id);
  const existsInCart = cart.find(item => item.productId === product.id);

  const prices = {
    spotPrice: product.price.toLocaleString('pt-br', { style: "currency", currency: "BRL" }),
    installmentPrice: (product.price * 1.12).toLocaleString('pt-br', { style: "currency", currency: "BRL" }),
    installmentValue: (product.price * 1.12 / 12).toLocaleString('pt-br', { style: "currency", currency: "BRL" }),
  }

  const onAddToWishlist = () => {
    !existsInWishlist ? addToWishlist(product.id) : removeFromWishlist(product.id);
  }

  const onAddToCart = () => {
    !existsInCart ? addToCart(product.id) : removeFromCart(product.id);
  }

  return (
    <div className="relative w-full bg-slate-700 rounded overflow-hidden cursor-pointer group">
      <div className="overflow-hidden">
        <img
          src={product.image.url}
          alt=""
          className="w-full h-[270px] object-cover group-hover:opacity-80 transition-opacity"
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        <div>
          <h1 className="text-md font-medium">{product.title}</h1>
          <span className="text-xs text-gray-300">{product.amountInStock} unidade(s)</span>
        </div>

        <div className="flex flex-col gap-[0.15rem]">
          <span className="text-sm text-green-500">à vista</span>
          <h1 className="text-lg text-green-500 font-bold">{prices.spotPrice}</h1>
          <span className="text-sm">com 12% de desconto</span>
        </div>

        <div className="flex flex-col gap-[0.15rem]">
          <div className="h-[0.10rem] w-10 bg-gray-500 my-2" />
          <h1 className="text-lg text-red-500 font-bold">{prices.installmentPrice}</h1>
          <span className="text-sm">em até 12x de <b className="text-red-500">{prices.installmentValue}</b></span>
          <span className="text-sm">sem juros no cartão</span>
        </div>
      </div>

      <div className="absolute top-2 right-2 overflow-hidden flex items-center rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button onClick={onAddToWishlist} type="button" className="h-12 w-12 flex items-center justify-center border-l border-slate-600 bg-slate-700 hover:bg-slate-600">
          {existsInWishlist ? <AiFillHeart size={20} className="text-red-500" /> : <AiOutlineHeart size={20} />}
        </button>

        <button onClick={onAddToCart} type="button" className="h-12 w-12 flex items-center justify-center bg-slate-700 hover:bg-slate-600">
          {existsInCart ? <BsCartFill size={20} /> : <BsCart size={20} />}
        </button>
      </div>
    </div>
  );
}