import { useCart } from "../../context/CartContext";
import type { Product } from "../../types/store";
import { formatPrice } from "../../utils/formatPrice";
import { Icon } from "../common/Icon";

type ProductCardProps = { product: Product; onSelect: (id: string) => void };

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="product-card">
      <button
        className="product-image-button"
        type="button"
        onClick={() => onSelect(product.id)}
        aria-label={`Ver ${product.name}`}
      >
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.featured && (
          <span className="product-tag">Selección Marea</span>
        )}
      </button>
      <div className="product-info">
        <div className="product-meta">
          <span>{product.category}</span>
          <span className="rating">★ {product.rating.toFixed(1)}</span>
        </div>
        <button
          className="product-name"
          type="button"
          onClick={() => onSelect(product.id)}
        >
          {product.name}
        </button>
        <div className="product-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <button
            className="add-button"
            type="button"
            onClick={() => addItem(product)}
            disabled={product.stock === 0}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            <Icon name="plus" size={18} />
          </button>
        </div>
      </div>
    </article>
  );
}
