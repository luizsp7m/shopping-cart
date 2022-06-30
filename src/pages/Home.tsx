import { Layout } from "../components/Layout";
import { Product } from "../components/Product";
import { useGetProductsQuery } from "../graphql/generated";

export function Home() {
  const { data, loading } = useGetProductsQuery();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <Layout>
      <div className="grid grid-cols-auto-fit gap-4">
        {data?.products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </Layout>
  );
}