import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import { useCart } from "../contexts/CartContext";

export function Home() {
  const { products: data, isLoadingProducts } = useCart();

  return (
    <Layout>
      {isLoadingProducts ? "Loading..." : (
        <div className="grid grid-cols-auto-fill gap-4">
          {data?.products.map(product => (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
}