type FooterProps = { onNavigate: (path: string) => void };

export function Footer({ onNavigate }: FooterProps) {
  const visit =
    (path: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <footer className="site-footer">
      <div className="footer-main page-width">
        <div className="footer-brand">
          <button className="brand-mark" type="button" onClick={visit("/")}>
            <span className="brand-symbol">m.</span>
            <span>marea</span>
          </button>
          <p>
            Objetos cotidianos,
            <br />
            elegidos para durar.
          </p>
        </div>
        <div className="footer-column">
          <h3>Explorar</h3>
          <button onClick={visit("/")}>Inicio</button>
          <button onClick={visit("/products")}>Productos</button>
          <button onClick={visit("/products#categories")}>Categorías</button>
        </div>
        <div className="footer-column">
          <h3>Selección</h3>
          <button onClick={visit("/products?category=Cerámica")}>
            Cerámica
          </button>
          <button onClick={visit("/products?category=Iluminación")}>
            Iluminación
          </button>
          <button onClick={visit("/products?category=Aromas")}>Aromas</button>
        </div>
        <div className="footer-column">
          <h3>Encontranos</h3>
          <a href="mailto:hola@marea.store">hola@marea.store</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href="https://pinterest.com" target="_blank" rel="noreferrer">
            Pinterest
          </a>
        </div>
      </div>
      <div className="footer-bottom page-width">
        <span>
          © {new Date().getFullYear()} Marea. Todos los derechos reservados.
        </span>
        <span>Hecho con tiempo y cuidado.</span>
      </div>
    </footer>
  );
}
