import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "../types/store";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const storedCart = localStorage.getItem("marea-cart");
    return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readStoredCart);

  useEffect(() => {
    localStorage.setItem("marea-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const addItem = (product: Product, quantity = 1) => {
      setItems((currentItems) => {
        const existingItem = currentItems.find(
          (item) => item.product.id === product.id,
        );
        if (existingItem) {
          return currentItems.map((item) =>
            item.product.id === product.id
              ? {
                  ...item,
                  quantity: Math.min(item.quantity + quantity, product.stock),
                }
              : item,
          );
        }
        return [
          ...currentItems,
          { product, quantity: Math.min(quantity, product.stock) },
        ];
      });
    };

    return {
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce(
        (total, item) => total + item.product.price * item.quantity,
        0,
      ),
      addItem,
      updateQuantity: (productId, quantity) =>
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.product.id === productId
              ? {
                  ...item,
                  quantity: Math.min(Math.max(quantity, 1), item.product.stock),
                }
              : item,
          ),
        ),
      removeItem: (productId) =>
        setItems((currentItems) =>
          currentItems.filter((item) => item.product.id !== productId),
        ),
      clearCart: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe utilizarse dentro de CartProvider");
  return context;
}
