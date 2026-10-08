import Image from "next/image";
import type { Product } from "../../types/product";
import styles from "./ProductCard.module.css";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            className={styles.image}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            No image
          </div>
        )}

        <button
          type="button"
          className={styles.wishlist}
          aria-label={`Add ${product.title} to wishlist`}
        >
          ♡
        </button>
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>

        <p className={styles.category}>
          {product.category.name}
        </p>

        <p className={styles.price}>
          ${product.price}
        </p>
      </div>
    </article>
  );
}