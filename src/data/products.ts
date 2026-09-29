import type { Product } from "../types/store";

export const products: Product[] = [
  {
    id: "vaso-arcilla",
    name: "Vaso Arcilla",
    description:
      "Cerámica artesanal de líneas suaves, hecha a mano en pequeños lotes. Cada pieza tiene una textura y un carácter únicos.",
    price: 18900,
    image:
      "https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=85",
    category: "Cerámica",
    stock: 12,
    rating: 4.9,
    featured: true,
  },
  {
    id: "lampara-nube",
    name: "Lámpara Nube",
    description:
      "Luz cálida y difusa para acompañar tus momentos de pausa. Pantalla de vidrio opalino y base de madera natural.",
    price: 64900,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=85",
    category: "Iluminación",
    stock: 7,
    rating: 4.8,
    featured: true,
  },
  {
    id: "bandeja-ola",
    name: "Bandeja Ola",
    description:
      "Una forma orgánica para ordenar lo esencial. Madera maciza con acabado al aceite, creada para durar.",
    price: 32500,
    image:
      "https://images.unsplash.com/photo-1603199506016-b9a594b593c0?auto=format&fit=crop&w=900&q=85",
    category: "Objetos",
    stock: 18,
    rating: 4.7,
    featured: false,
  },
  {
    id: "jarron-marea",
    name: "Jarrón Marea",
    description:
      "Vidrio soplado en tono verde profundo. Una pieza escultórica incluso cuando está vacía.",
    price: 42800,
    image:
      "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=900&q=85",
    category: "Cerámica",
    stock: 5,
    rating: 5,
    featured: true,
  },
  {
    id: "vela-bruma",
    name: "Vela Bruma",
    description:
      "Cera vegetal y notas de cedro, té blanco y sal marina. Un aroma sereno para bajar el ritmo.",
    price: 15600,
    image:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=900&q=85",
    category: "Aromas",
    stock: 24,
    rating: 4.6,
    featured: false,
  },
  {
    id: "cuenco-sal",
    name: "Cuenco Sal",
    description:
      "Cuenco de gres esmaltado a mano, ideal para servir o guardar pequeños tesoros cotidianos.",
    price: 22300,
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85",
    category: "Cerámica",
    stock: 10,
    rating: 4.8,
    featured: false,
  },
  {
    id: "difusor-calma",
    name: "Difusor Calma",
    description:
      "Difusor de cerámica porosa con esencia botánica. Aromatiza suavemente y suma una nota de calma.",
    price: 28900,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    category: "Aromas",
    stock: 9,
    rating: 4.7,
    featured: true,
  },
  {
    id: "aplique-rio",
    name: "Aplique Río",
    description:
      "Diseño compacto en metal cepillado con una luz amable para rincones de lectura y descanso.",
    price: 78900,
    image:
      "https://images.unsplash.com/photo-1543198126-a8ad8e47fb22?auto=format&fit=crop&w=900&q=85",
    category: "Iluminación",
    stock: 4,
    rating: 4.9,
    featured: false,
  },
];

export const categories = [
  ...new Set(products.map((product) => product.category)),
];
