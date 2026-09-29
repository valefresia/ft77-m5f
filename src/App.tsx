import { useEffect, useState } from "react";
import { MainLayout } from "./components/layouts/MainLayout";
import { CartPage } from "./pages/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage";
import { HomePage } from "./pages/HomePage";
import { ProductDetails } from "./pages/ProductDetails";
import { ProductsPage } from "./pages/ProductsPage";
import { products } from "./data/products";
import type { StoreRoute } from "./types/store";

function routeFromPath(pathname: string): StoreRoute {
  if (pathname === "/products") return "products";
  if (pathname.startsWith("/products/")) return "detail";
  if (pathname === "/cart") return "cart";
  if (pathname === "/checkout") return "checkout";
  return "home";
}

function currentLocation() {
  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
}

function App() {
  const [location, setLocation] = useState(currentLocation);
  const route = routeFromPath(window.location.pathname);

  useEffect(() => {
    const syncLocation = () => setLocation(currentLocation());
    window.addEventListener("popstate", syncLocation);
    return () => window.removeEventListener("popstate", syncLocation);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setLocation(currentLocation());
    if (path.includes("#")) {
      window.requestAnimationFrame(() =>
        document
          .querySelector(path.slice(path.indexOf("#")))
          ?.scrollIntoView({ behavior: "smooth" }),
      );
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const selectProduct = (id: string) => navigate(`/products/${id}`);
  const productId = window.location.pathname.split("/").at(-1);
  const selectedProduct = products.find((product) => product.id === productId);

  let content: React.ReactNode;
  if (route === "products")
    content = <ProductsPage key={location} onSelectProduct={selectProduct} />;
  else if (route === "detail")
    content = selectedProduct ? (
      <ProductDetails
        key={selectedProduct.id}
        product={selectedProduct}
        onNavigate={navigate}
      />
    ) : (
      <section className="empty-state page-width">
        <h2>No encontramos esa pieza.</h2>
        <button
          className="button button-primary"
          type="button"
          onClick={() => navigate("/products")}
        >
          Volver a productos
        </button>
      </section>
    );
  else if (route === "cart") content = <CartPage onNavigate={navigate} />;
  else if (route === "checkout")
    content = <CheckoutPage onNavigate={navigate} />;
  else
    content = (
      <HomePage onNavigate={navigate} onSelectProduct={selectProduct} />
    );

  return (
    <MainLayout onNavigate={navigate} currentRoute={route}>
      {content}
    </MainLayout>
  );
}

export default App;
