import { AiOutlineShoppingCart, AiFillHeart, AiOutlineHeart } from "react-icons/ai";

export function Product() {
  return (
    <div className="relative w-[320px] bg-slate-700 rounded overflow-hidden border border-slate-600 cursor-pointer group">
      <img
        src="https://media.pichau.com.br/media/catalog/product/cache/ef72d3c27864510e5d4c0ce69bade259/p/g/pg-omg-blu01.jpg"
        alt=""
        className="w-full h-[300px] object-cover"
      />

      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-md font-medium">Cadeira Gamer Pichau Omega</h1>

        <div className="flex flex-col gap-[0.15rem]">
          <span className="text-sm text-green-500">à vista</span>
          <h1 className="text-lg text-green-500 font-bold">R$ 999,99</h1>
          <span className="text-sm">no PIX com 12% de desconto</span>
        </div>

        <div className="flex flex-col gap-[0.15rem]">
          <div className="h-[0.15rem] w-10 bg-red-500 my-2" />
          <h1 className="text-lg text-red-500 font-bold">R$ 999,99</h1>
          <span className="text-sm">em até 12x de <b className="text-red-500">90,09</b></span>
          <span className="text-sm">sem juros no cartão</span>
        </div>
      </div>

      <div className="absolute border border-slate-600 top-2 right-2 bg-slate-700 overflow-hidden flex items-center rounded opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <button type="button" className="h-12 w-12 flex items-center justify-center">
          <AiOutlineShoppingCart size={20} />
        </button>

        <button type="button" className="h-12 w-12 flex items-center justify-center border-l border-slate-600">
          <AiOutlineHeart size={20} />
        </button>
      </div>
    </div>
  );
}