import { useMemo, useState } from "react";
import { Layout } from "../components/Layout";
import { useCart } from "../contexts/CartContext";

interface ProductItemProps {
  product: {
    id: string;
    title: string;
    price: number;
    amount: number;
    image: {
      url: string;
    }
  }
}

export function Cart() {
  const { cart, products } = useCart();

  const productsInCart = useMemo(() => cart.map(productId => products?.products.find(product => product.id === productId)), [cart]);

  return (
    <Layout>
      <div>
        <main>
          {productsInCart.map(product => (
            <ProductItem key={product?.id} product={product} />
          ))}
        </main>

        <aside>

        </aside>
      </div>
    </Layout>
  );
}

function ProductItem({ product }: ProductItemProps) {
  const [productAmount, setProductAmount] = useState(1);

  return (
    <div>
      <img src={product?.image.url} alt="" />
      <h1>{product?.title}</h1>

      <div>
        {productAmount}
      </div>

      <span>{product?.price * productAmount}</span>
    </div>
  );
}