import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            LOGO
          </Link>

          <p>
            Discover thoughtfully designed products
            for everyday living.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.column}>
            <h2>SHOP</h2>

            <Link href="/products">
              All Products
            </Link>

            <Link href="/products?category=T-Shirts">
              T-Shirts
            </Link>

            <Link href="/products?category=Shirts">
              Shirts
            </Link>

            <Link href="/products?category=Jeans">
              Jeans
            </Link>
          </div>

          <div className={styles.column}>
            <h2>HELP</h2>

            <Link href="/products">
              Contact
            </Link>

            <Link href="/products">
              Shipping
            </Link>

            <Link href="/products">
              Returns
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>
          © {new Date().getFullYear()} Appscrip.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}