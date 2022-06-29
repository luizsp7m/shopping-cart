import { Layout } from "../components/Layout";
import { Product } from "../components/Product";

export function Home() {
  return (
    <Layout>
      <div className="flex gap-4">
        <Product />
        <Product />
        <Product />
      </div>
    </Layout>
  );
}