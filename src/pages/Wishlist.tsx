import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import { useCart } from "../contexts/CartContext";

export function Wishlist() {
  const { wishlist, data, loading } = useCart();

  const productsInWishlist = wishlist.map(item => data?.products.find(product => product.id === item.productId));

  return (
    <Layout>
      {!loading && (
        <div className="grid grid-cols-auto-fill gap-4">
          {productsInWishlist.map(product => (
            product && <Product key={product.id} product={product} />
          ))}
        </div>
      )}
    </Layout>
  );
}