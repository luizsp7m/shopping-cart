import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import { useCart } from "../contexts/CartContext";

export function Wishlist() {
  const { wishlist, products: data, isLoadingProducts } = useCart();

  return (
    <Layout>
      {isLoadingProducts ? "Loading..." : (
        <div className="grid grid-cols-auto-fit gap-4">
          {data?.products.map(product => wishlist.includes(product.id) && (
            <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
}