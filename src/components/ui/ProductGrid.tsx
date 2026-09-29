import type { Product } from "../../types/store";
import { ProductCard } from "./ProductCard";

export function ProductGrid({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (id: string) => void;
}) {
  if (products.length === 0)
    return (
      <p className="empty-results">
        No encontramos productos con esos filtros. Probá con otra búsqueda.
      </p>
    );
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelect} />
      ))}
    </div>
  );
}
