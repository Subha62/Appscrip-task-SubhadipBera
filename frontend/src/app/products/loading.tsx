import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.grid} aria-label="Loading products">
      {Array.from({ length: 6 }).map((_, index) => (
        <div className={styles.card} key={index}>
          <div className={styles.image} />

          <div className={styles.content}>
            <div className={styles.title} />
            <div className={styles.category} />
            <div className={styles.price} />
          </div>
        </div>
      ))}
    </div>
  );
}
