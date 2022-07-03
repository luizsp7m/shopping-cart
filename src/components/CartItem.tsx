import { AiOutlinePlus, AiOutlineMinus, AiFillDelete } from "react-icons/ai";
import { useCart } from "../contexts/CartContext";
import { useGetProductByIdQuery } from "../graphql/generated";

interface Props {
  productId: string;
  amountInCart: number;
}

export function CartItem({ productId, amountInCart }: Props) {
  const { addAmountInCart, removeAmountInCart } = useCart();

  const { data } = useGetProductByIdQuery({
    variables: {
      id: productId,
    }
  });

  if (!data?.product) return <p>Loading...</p>;

  return (
    <div className="flex justify-between gap-6 items-center rounded">
      <img
        className="h-20 w-20 object-cover rounded"
        src={data.product.image.url}
        alt=""
      />

      <h1 className="text-md font-medium">{data.product.title}</h1>

      <div className="flex flex-col gap-4 items-center">
        <span className="text-sm text-gray-400">Quantidade</span>

        <div className="flex items-center gap-4">
          <button
            className="h-8 w-8 bg-red-400 rounded flex items-center justify-center hover:bg-red-500 disabled:bg-red-300"
            type="button"
            onClick={() => removeAmountInCart({ productId, amountInCart })}
            disabled={amountInCart <= 1}
          >
            <AiOutlineMinus className="text-white" size={12} />
          </button>

          <span className="text-md font-medium h-8 w-4 flex items-center justify-center">{amountInCart}</span>

          <button
            className="h-8 w-8 bg-red-400 rounded flex items-center justify-center hover:bg-red-500 disabled:bg-red-300"
            type="button"
            onClick={() => addAmountInCart({ productId, amountInCart })}
            disabled={amountInCart >= data.product.amountInStock}
          >
            <AiOutlinePlus className="text-white" size={12} />
          </button>
        </div>

        <button className="flex items-center gap-2 text-red-400 cursor-pointer hover:text-red-500" type="button">
          <AiFillDelete size={16} />
          <span>Remover</span>
        </button>
      </div>

      <div className="flex flex-col gap-2 items-end">
        <span className="text-sm text-gray-400">Preço à vista</span>
        <span className="text-green-500 font-bold text-lg">R$ {data.product.price}</span>
      </div>
    </div>
  );
}