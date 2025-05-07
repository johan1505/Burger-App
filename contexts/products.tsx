import { useQuery } from "@tanstack/react-query";
import React, { createContext } from "react";
import { Text } from "react-native";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  calorie: number;
  slug: string;
}

interface ProductsResponse {
  products: Array<Product>;
}

type ProducsClientStore = Map<string, Product>;

type ProductsContext = {
  products: ProducsClientStore;
};

export const ProductsContext = createContext<ProductsContext>({
  products: new Map(),
});

const getProductsClientStore = (
  products: Array<Product>
): ProducsClientStore => {
  return new Map(products.map((product) => [product.id, product]));
};

const LIST_PRODUCTS_API = "https://burgerhub00.github.io/data/products.json";

export const ProdutcsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data, error, isLoading } = useQuery<ProductsResponse>({
    queryKey: ["products"],
    queryFn: () => fetch(LIST_PRODUCTS_API).then((res) => res.json()),
  });

  if (isLoading) return <Text>Loading ...</Text>;
  if (error || !data) return <Text>Error</Text>;

  const context: ProductsContext = {
    products: getProductsClientStore(data.products),
  };

  return (
    <ProductsContext.Provider value={context}>
      {children}
    </ProductsContext.Provider>
  );
};
