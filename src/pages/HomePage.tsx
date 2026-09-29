import { products } from "../data/products";
import { Icon } from "../components/common/Icon";
import { ProductGrid } from "../components/ui/ProductGrid";

type HomePageProps = {
  onNavigate: (path: string) => void;
  onSelectProduct: (id: string) => void;
};

export function HomePage({ onNavigate, onSelectProduct }: HomePageProps) {
  return (
    <>
      <section className="hero-section page-width">
        <div className="hero-copy">
          <span className="eyebrow">
            <Icon name="sparkle" size={15} /> Hecho para habitar
          </span>
          <h1>
            Tu casa,
            <br />
            <em>a tu manera.</em>
          </h1>
          <p>
            Objetos honestos, materiales nobles y pequeños detalles que hacen
            que lo cotidiano se sienta especial.
          </p>
          <button
            className="button button-primary"
            type="button"
            onClick={() => onNavigate("/products")}
          >
            Descubrir productos <Icon name="arrow" size={17} />
          </button>
          <div className="hero-note">
            <span className="note-line" />
            Diseño consciente, todos los días
          </div>
        </div>
        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=90"
            alt="Sala luminosa con objetos de diseño y materiales naturales"
          />
          <div className="hero-caption">
            <span>Rituales de todos los días</span>
            <strong>Edición hogar 2026</strong>
          </div>
          <span className="hero-index">01 / 03</span>
        </div>
      </section>

      <section className="promise-strip">
        <div className="page-width promise-inner">
          <span>Envíos a todo el país</span>
          <span className="promise-dot" />
          <span>Hecho en pequeños lotes</span>
          <span className="promise-dot" />
          <span>Pagá en 3 cuotas</span>
        </div>
      </section>

      <section className="featured-section page-width" id="featured">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Elegidos para vos</span>
            <h2>Piezas que se quedan</h2>
          </div>
          <button
            className="text-link"
            type="button"
            onClick={() => onNavigate("/products")}
          >
            Ver todos <Icon name="arrow" size={17} />
          </button>
        </div>
        <ProductGrid
          products={products.filter((product) => product.featured).slice(0, 4)}
          onSelect={onSelectProduct}
        />
      </section>

      <section className="story-band">
        <div className="story-image">
          <img
            src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=85"
            alt="Detalle de objetos artesanales sobre una mesa de madera"
            loading="lazy"
          />
        </div>
        <div className="story-copy">
          <span className="eyebrow">Una pausa en lo cotidiano</span>
          <h2>
            Menos cosas.
            <br />
            <em>Más sentido.</em>
          </h2>
          <p>
            Trabajamos con talleres independientes para crear objetos útiles,
            duraderos y hechos con intención.
          </p>
          <button
            className="button button-outline"
            type="button"
            onClick={() => onNavigate("/products")}
          >
            Conocé la colección <Icon name="arrow" size={17} />
          </button>
        </div>
      </section>
    </>
  );
}
