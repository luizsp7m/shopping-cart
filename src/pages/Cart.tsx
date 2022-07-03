import { CartItem } from "../components/CartItem";
import { Layout } from "../components/Layout";
import { useCart } from "../contexts/CartContext";

export function Cart() {
  const { cart } = useCart();

  return (
    <Layout>
      <div className="flex gap-8">
        <main className="flex flex-col flex-1 gap-8">
          {cart.map(item => <CartItem key={item.productId} productId={item.productId} amountInCart={item.amountInCart} />)}
        </main>

        {/* <aside className="w-[120px]">
            <h1>Resumo</h1>
          </aside> */}
      </div>
    </Layout>
  );
}