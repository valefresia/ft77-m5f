import { useState, type FormEvent } from "react";
import { useCart } from "../context/CartContext";
import type { Customer, Order } from "../types/store";
import { formatPrice } from "../utils/formatPrice";
import { Icon } from "../components/common/Icon";

type CheckoutPageProps = { onNavigate: (path: string) => void };
const initialCustomer: Customer = {
  name: "",
  email: "",
  phone: "",
  address: "",
  paymentMethod: "credit",
};

export function CheckoutPage({ onNavigate }: CheckoutPageProps) {
  const { items, subtotal, clearCart } = useCart();
  const [customer, setCustomer] = useState(initialCustomer);
  const [order, setOrder] = useState<Order | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newOrder: Order = {
      number: `MR-${Date.now().toString().slice(-7)}`,
      customer,
      items,
      total: subtotal,
    };
    setOrder(newOrder);
    clearCart();
  };

  if (order)
    return (
      <section className="success-page page-width">
        <span className="success-icon">
          <Icon name="check" size={34} />
        </span>
        <span className="eyebrow">Gracias por elegir Marea</span>
        <h1>
          Tu compra está
          <br />
          <em>en camino.</em>
        </h1>
        <p>
          Recibimos tu pedido y enviamos los detalles a{" "}
          <strong>{order.customer.email}</strong>.
        </p>
        <div className="order-number">
          <span>Número de orden</span>
          <strong>{order.number}</strong>
        </div>
        <button
          className="button button-primary"
          type="button"
          onClick={() => onNavigate("/products")}
        >
          Seguir explorando <Icon name="arrow" size={17} />
        </button>
      </section>
    );

  if (items.length === 0)
    return (
      <section className="empty-state page-width">
        <span className="empty-icon">
          <Icon name="bag" size={30} />
        </span>
        <h2>Tu carrito está vacío.</h2>
        <p>Agregá alguna pieza antes de continuar con la compra.</p>
        <button
          className="button button-primary"
          type="button"
          onClick={() => onNavigate("/products")}
        >
          Explorar productos <Icon name="arrow" size={17} />
        </button>
      </section>
    );

  return (
    <section className="checkout-page page-width">
      <div className="page-heading">
        <span className="eyebrow">Un último paso</span>
        <h1>
          Finalizar compra<span className="heading-period">.</span>
        </h1>
      </div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>
              <span>01</span> Tus datos
            </legend>
            <div className="form-grid">
              <label className="field-full">
                Nombre completo
                <input
                  autoComplete="name"
                  required
                  value={customer.name}
                  onChange={(event) =>
                    setCustomer({ ...customer, name: event.target.value })
                  }
                  placeholder="Como querés que te llamemos"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  autoComplete="email"
                  required
                  value={customer.email}
                  onChange={(event) =>
                    setCustomer({ ...customer, email: event.target.value })
                  }
                  placeholder="nombre@email.com"
                />
              </label>
              <label>
                Teléfono
                <input
                  type="tel"
                  autoComplete="tel"
                  required
                  value={customer.phone}
                  onChange={(event) =>
                    setCustomer({ ...customer, phone: event.target.value })
                  }
                  placeholder="+54 9 11 0000 0000"
                />
              </label>
              <label className="field-full">
                Dirección de entrega
                <input
                  autoComplete="street-address"
                  required
                  value={customer.address}
                  onChange={(event) =>
                    setCustomer({ ...customer, address: event.target.value })
                  }
                  placeholder="Calle, número, ciudad"
                />
              </label>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              <span>02</span> Medio de pago
            </legend>
            <div className="payment-options">
              <label
                className={
                  customer.paymentMethod === "credit"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="payment"
                  value="credit"
                  checked={customer.paymentMethod === "credit"}
                  onChange={(event) =>
                    setCustomer({
                      ...customer,
                      paymentMethod: event.target.value,
                    })
                  }
                />
                <span>
                  <strong>Tarjeta de crédito</strong>
                  <small>Hasta 3 cuotas sin interés</small>
                </span>
              </label>
              <label
                className={
                  customer.paymentMethod === "debit"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="payment"
                  value="debit"
                  checked={customer.paymentMethod === "debit"}
                  onChange={(event) =>
                    setCustomer({
                      ...customer,
                      paymentMethod: event.target.value,
                    })
                  }
                />
                <span>
                  <strong>Tarjeta de débito</strong>
                  <small>Pago en una cuota</small>
                </span>
              </label>
              <label
                className={
                  customer.paymentMethod === "transfer"
                    ? "payment-option selected"
                    : "payment-option"
                }
              >
                <input
                  type="radio"
                  name="payment"
                  value="transfer"
                  checked={customer.paymentMethod === "transfer"}
                  onChange={(event) =>
                    setCustomer({
                      ...customer,
                      paymentMethod: event.target.value,
                    })
                  }
                />
                <span>
                  <strong>Transferencia</strong>
                  <small>Pago por transferencia</small>
                </span>
              </label>
            </div>
          </fieldset>
          <button className="button button-primary full-button" type="submit">
            Finalizar compra <Icon name="arrow" size={17} />
          </button>
        </form>
        <aside className="order-summary checkout-summary">
          <h2>Tu pedido</h2>
          <div className="checkout-products">
            {items.map((item) => (
              <div className="checkout-product" key={item.product.id}>
                <img src={item.product.image} alt="" />
                <span>
                  {item.product.name}
                  <small>Cantidad: {item.quantity}</small>
                </span>
                <strong>
                  {formatPrice(item.product.price * item.quantity)}
                </strong>
              </div>
            ))}
          </div>
          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="summary-line">
            <span>Envío</span>
            <span className="shipping-note">Gratis</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>
          <p className="summary-tax">
            El pago es simulado. No se realizará ningún cargo.
          </p>
        </aside>
      </div>
    </section>
  );
}
