import { useMemo, useState } from "react";
import { categories, products } from "../data/products";
import { ProductGrid } from "../components/ui/ProductGrid";
import { Icon } from "../components/common/Icon";

type ProductsPageProps = { onSelectProduct: (id: string) => void };

export function ProductsPage({ onSelectProduct }: ProductsPageProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(
    new URLSearchParams(window.location.search).get("category") ?? "Todas",
  );
  const [sort, setSort] = useState("featured");

  const filteredProducts = useMemo(() => {
    const matchingProducts = products.filter(
      (product) =>
        product.name
          .toLocaleLowerCase("es")
          .includes(search.toLocaleLowerCase("es")) &&
        (category === "Todas" || product.category === category),
    );

    if (sort === "price-asc")
      return [...matchingProducts].sort(
        (first, second) => first.price - second.price,
      );
    if (sort === "price-desc")
      return [...matchingProducts].sort(
        (first, second) => second.price - first.price,
      );
    return [...matchingProducts].sort(
      (first, second) => Number(second.featured) - Number(first.featured),
    );
  }, [category, search, sort]);

  return (
    <section className="catalog-page page-width" id="catalog">
      <div className="catalog-intro">
        <span className="eyebrow">La colección</span>
        <h1>
          Objetos para
          <br />
          <em>quedarse.</em>
        </h1>
        <p>Diseño con intención para darle lugar a lo que importa.</p>
      </div>
      <div className="catalog-toolbar" id="categories">
        <label className="search-field">
          <Icon name="search" />
          <span className="sr-only">Buscar productos</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="¿Qué estás buscando?"
          />
        </label>
        <div className="filter-controls">
          <label>
            <span className="sr-only">Filtrar por categoría</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="Todas">Todas las categorías</option>
              {categories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Ordenar productos</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Destacados</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
            </select>
          </label>
        </div>
      </div>
      <div className="catalog-result-count">
        {filteredProducts.length}{" "}
        {filteredProducts.length === 1 ? "pieza" : "piezas"} para descubrir
      </div>
      <ProductGrid products={filteredProducts} onSelect={onSelectProduct} />
    </section>
  );
}
