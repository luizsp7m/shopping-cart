import { ApolloProvider } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { Router } from "./Router";
import { client } from "./lib/apollo";

export function App() {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </CartProvider>
    </ApolloProvider>
  );
}