"use client";

import styles from "./error.module.css";

interface ErrorPageProps {
  reset: () => void;
}

export default function ErrorPage({
  reset,
}: ErrorPageProps) {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <p className={styles.label}>
          SOMETHING WENT WRONG
        </p>

        <h1>
          We couldn't load the products.
        </h1>

        <p className={styles.message}>
          Please try again. If the problem continues,
          check your connection and try again later.
        </p>

        <button
          type="button"
          onClick={reset}
          className={styles.button}
        >
          TRY AGAIN
        </button>
      </div>
    </main>
  );
}