import styles from "./SearchBar.module.css";

interface SearchBarProps {
  currentQuery?: string;
}

export default function SearchBar({
  currentQuery = "",
}: SearchBarProps) {
  return (
    <form
      className={styles.search}
      action="/products"
      method="GET"
    >
      <label htmlFor="product-search" className={styles.label}>
        Search products
      </label>

      <div className={styles.inputWrapper}>
        <input
          id="product-search"
          name="q"
          type="search"
          defaultValue={currentQuery}
          placeholder="Search products..."
          className={styles.input}
        />

        <button
          type="submit"
          className={styles.button}
        >
          SEARCH
        </button>
      </div>
    </form>
  );
}