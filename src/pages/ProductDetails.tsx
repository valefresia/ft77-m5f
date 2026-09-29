import { useState } from "react";
import type { Product } from "../types/store";
import { useCart } from "../context/CartContext";
import { Icon } from "../components/common/Icon";
import { formatPrice } from "../utils/formatPrice";

type ProductDetailsProps = {
  product: Product;
  onNavigate: (path: string) => void;
};

export function ProductDetails({ product, onNavigate }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const addToCart = () => {
    addItem(product, quantity);
    setAdded(true);
  };

  return (
    <section className="detail-page page-width">
      <button
        className="back-link"
        type="button"
        onClick={() => onNavigate("/products")}
      >
        ← Volver a productos
      </button>
      <div className="detail-layout">
        <div className="detail-image">
          <img src={product.image} alt={product.name} />
        </div>
        <div className="detail-copy">
          <span className="eyebrow">{product.category}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating">
            <span>★ {product.rating.toFixed(1)}</span>
            <span>Opiniones de nuestra comunidad</span>
          </div>
          <p className="detail-description">{product.description}</p>
          <strong className="detail-price">{formatPrice(product.price)}</strong>
          <span className="stock-status">
            <span className="stock-dot" />
            {product.stock <= 5
              ? `Quedan ${product.stock} unidades`
              : "Disponible para envío"}
          </span>
          <div className="detail-purchase">
            <div className="quantity-control">
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.max(1, current - 1))
                }
                aria-label="Disminuir cantidad"
              >
                <Icon name="minus" size={15} />
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                onClick={() =>
                  setQuantity((current) => Math.min(product.stock, current + 1))
                }
                disabled={quantity >= product.stock}
                aria-label="Aumentar cantidad"
              >
                <Icon name="plus" size={15} />
              </button>
            </div>
            <button
              className="button button-primary"
              type="button"
              onClick={addToCart}
              disabled={product.stock < 1}
            >
              {added ? (
                <>
                  <Icon name="check" /> Agregado al carrito
                </>
              ) : (
                <>
                  Agregar al carrito <Icon name="bag" size={18} />
                </>
              )}
            </button>
          </div>
          <div className="detail-benefits">
            <span>Envío gratis desde $80.000</span>
            <span>3 cuotas sin interés</span>
            <span>30 días para cambios</span>
          </div>
        </div>
      </div>
    </section>
  );
}
