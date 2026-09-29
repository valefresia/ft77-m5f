import { useState } from "react";
import { useCart } from "../../context/CartContext";
import { useTheme } from "../../context/ThemeContext";
import type { StoreRoute } from "../../types/store";
import { Icon } from "./Icon";

type HeaderProps = {
  onNavigate: (path: string) => void;
  currentRoute: StoreRoute;
};

export function Header({ onNavigate, currentRoute }: HeaderProps) {
  const { itemCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = (path: string) => {
    onNavigate(path);
    setMenuOpen(false);
  };

  const linkClass = (route: StoreRoute) =>
    currentRoute === route ? "nav-link active" : "nav-link";

  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="brand-mark"
          type="button"
          onClick={() => navigate("/")}
          aria-label="Marea, ir al inicio"
        >
          <span className="brand-symbol">m.</span>
          <span>marea</span>
        </button>
        <nav
          className={menuOpen ? "main-nav open" : "main-nav"}
          aria-label="Navegación principal"
        >
          <button
            className={linkClass("home")}
            type="button"
            onClick={() => navigate("/")}
          >
            Inicio
          </button>
          <button
            className={linkClass("products")}
            type="button"
            onClick={() => navigate("/products")}
          >
            Productos
          </button>
          <button
            className="nav-link"
            type="button"
            onClick={() => navigate("/products#categories")}
          >
            Categorías
          </button>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button search-action"
            type="button"
            onClick={() => navigate("/products#catalog")}
            aria-label="Buscar productos"
            title="Buscar productos"
          >
            <Icon name="search" />
          </button>
          <button
            className="icon-button theme-action"
            type="button"
            onClick={toggleTheme}
            aria-label={
              theme === "light" ? "Activar modo oscuro" : "Activar modo claro"
            }
            title={theme === "light" ? "Modo oscuro" : "Modo claro"}
          >
            <Icon name={theme === "light" ? "moon" : "sun"} />
          </button>
          <button
            className="icon-button cart-action"
            type="button"
            onClick={() => navigate("/cart")}
            aria-label={`Carrito, ${itemCount} productos`}
            title="Carrito"
          >
            <Icon name="bag" />
            {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
          </button>
          <button
            className="icon-button menu-action"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <Icon name={menuOpen ? "close" : "menu"} />
          </button>
        </div>
      </div>
    </header>
  );
}
