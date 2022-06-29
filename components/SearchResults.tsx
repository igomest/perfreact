import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

interface SearchResultsProps {
  totalPrice: number;
  results: Array<{
    id: number;
    price: number;
    title: string;
  }>;
  onAddToWishlist: (id: number) => void;
}

export const SearchResults = ({ results, onAddToWishlist, totalPrice }: SearchResultsProps) => {


  return (
    <div>
      <h2>{totalPrice}</h2>
      {results.map((product) => (
        <ProductItem key={product.id} product={product} onAddToWishlist={onAddToWishlist} />
      ))}
    </div>
  );
};
