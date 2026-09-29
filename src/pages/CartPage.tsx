import { useCart } from "../context/CartContext";
import { CartItemRow } from "../components/ui/CartItemRow";
import { formatPrice } from "../utils/formatPrice";
import { Icon } from "../components/common/Icon";

type CartPageProps = { onNavigate: (path: string) => void };

export function CartPage({ onNavigate }: CartPageProps) {
  const { items, subtotal, updateQuantity, removeItem } = useCart();

  return (
    <section className="cart-page page-width">
      <div className="page-heading">
        <span className="eyebrow">Tu selección</span>
        <h1>
          Tu carrito<span className="heading-period">.</span>
        </h1>
        <p>
          {items.reduce((total, item) => total + item.quantity, 0)} productos
        </p>
      </div>
      {items.length === 0 ? (
        <div className="empty-state">
          <span className="empty-icon">
            <Icon name="bag" size={30} />
          </span>
          <h2>Por ahora, está vacío.</h2>
          <p>Hay objetos esperando encontrar su lugar en tu casa.</p>
          <button
            className="button button-primary"
            type="button"
            onClick={() => onNavigate("/products")}
          >
            Explorar productos <Icon name="arrow" size={17} />
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map((item) => (
              <CartItemRow
                key={item.product.id}
                item={item}
                onQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
            <button
              className="continue-link"
              type="button"
              onClick={() => onNavigate("/products")}
            >
              ← Seguir explorando
            </button>
          </div>
          <aside className="order-summary">
            <h2>Resumen</h2>
            <div className="summary-line">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="summary-line">
              <span>Envío</span>
              <span className="shipping-note">A calcular</span>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <p className="summary-tax">Impuestos incluidos</p>
            <button
              className="button button-primary full-button"
              type="button"
              onClick={() => onNavigate("/checkout")}
            >
              Continuar al pago <Icon name="arrow" size={17} />
            </button>
            <div className="secure-note">
              <Icon name="check" size={16} />
              Compra segura y protegida
            </div>
          </aside>
        </div>
      )}
    </section>
  );
}
