import Link from "next/link";
import styles from "./Pagination.module.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  currentParams: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  currentParams,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();

    Object.entries(currentParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value);
      }
    });

    params.set("page", String(page));

    return `/products?${params.toString()}`;
  };

  return (
    <nav className={styles.pagination} aria-label="Product pagination">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)}>
          PREVIOUS
        </Link>
      ) : (
        <span className={styles.disabled}>PREVIOUS</span>
      )}

      <div className={styles.pages}>
        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;

          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={page === currentPage ? styles.active : ""}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)}>
          NEXT
        </Link>
      ) : (
        <span className={styles.disabled}>NEXT</span>
      )}
    </nav>
  );
}