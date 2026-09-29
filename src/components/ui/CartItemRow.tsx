import type { CartItem } from "../../types/store";
import { Icon } from "../common/Icon";
import { formatPrice } from "../../utils/formatPrice";

type CartItemRowProps = {
  item: CartItem;
  onQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
};

export function CartItemRow({ item, onQuantity, onRemove }: CartItemRowProps) {
  return (
    <article className="cart-item">
      <img src={item.product.image} alt={item.product.name} />
      <div className="cart-item-info">
        <span className="eyebrow">{item.product.category}</span>
        <h3>{item.product.name}</h3>
        <span className="cart-unit-price">
          {formatPrice(item.product.price)}
        </span>
      </div>
      <div
        className="quantity-control"
        aria-label={`Cantidad de ${item.product.name}`}
      >
        <button
          type="button"
          onClick={() => onQuantity(item.product.id, item.quantity - 1)}
          aria-label="Disminuir cantidad"
        >
          <Icon name="minus" size={15} />
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          onClick={() => onQuantity(item.product.id, item.quantity + 1)}
          disabled={item.quantity >= item.product.stock}
          aria-label="Aumentar cantidad"
        >
          <Icon name="plus" size={15} />
        </button>
      </div>
      <strong className="cart-line-total">
        {formatPrice(item.product.price * item.quantity)}
      </strong>
      <button
        className="remove-button"
        type="button"
        onClick={() => onRemove(item.product.id)}
        aria-label={`Eliminar ${item.product.name}`}
      >
        <Icon name="trash" size={18} />
      </button>
    </article>
  );
}
