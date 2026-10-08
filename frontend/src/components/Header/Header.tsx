import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <nav className={styles.leftNav} aria-label="Main navigation">
          <Link href="/products">SHOP</Link>
          <Link href="/products">COLLECTIONS</Link>
        </nav>

        <Link href="/" className={styles.logo} aria-label="Home">
          LOGO
        </Link>

        <nav className={styles.rightNav} aria-label="Utility navigation">
          <button type="button" aria-label="Search">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="11" cy="11" r="6.5" />
              <path d="m16 16 5 5" />
            </svg>
          </button>

          <button type="button" aria-label="Account">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M5 21c.7-4 3.1-6 7-6s6.3 2 7 6" />
            </svg>
          </button>

          <button type="button" aria-label="Wishlist">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.8 8.8c0 5.2-8.8 10.1-8.8 10.1S3.2 14 3.2 8.8A4.8 4.8 0 0 1 12 6.1a4.8 4.8 0 0 1 8.8 2.7Z" />
            </svg>
          </button>

          <button type="button" aria-label="Shopping bag">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 8h14l-1 13H6L5 8Z" />
              <path d="M9 8V6a3 3 0 0 1 6 0v2" />
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}