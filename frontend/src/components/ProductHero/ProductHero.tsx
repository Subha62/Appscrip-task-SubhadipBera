import styles from "./ProductHero.module.css";

export default function ProductHero() {
  return (
    <section className={styles.hero}>
      <p className={styles.eyebrow}>NEW COLLECTION</p>

      <h1>DISCOVER OUR PRODUCTS</h1>

      <p className={styles.description}>
        Explore our collection of thoughtfully designed products made for
        everyday living.
      </p>
    </section>
  );
}