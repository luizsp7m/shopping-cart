import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import { useCart } from "../contexts/CartContext";

export function Home() {
  const { data, loading } = useCart();

  return (
    <Layout>
      {!loading && (
        <div className="grid grid-cols-auto-fill gap-4">
          {data?.products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
}