import Link from "next/link";
import type { Category } from "../../types/product";
import styles from "./FilterSidebar.module.css";

interface FilterSidebarProps {
  categories: Category[];
  currentParams: Record<string, string | undefined>;
}

export default function FilterSidebar({
  categories,
  currentParams,
}: FilterSidebarProps) {
  const createFilterUrl = (
    key: string,
    value?: string,
  ) => {
    const params = new URLSearchParams();

    Object.entries(currentParams).forEach(([param, paramValue]) => {
      if (
        paramValue &&
        param !== key &&
        param !== "page" &&
        param !== "minPrice" &&
        param !== "maxPrice"
      ) {
        params.set(param, paramValue);
      }
    });

    if (value) {
      params.set(key, value);
    }

    return `/products?${params.toString()}`;
  };

  const createPriceUrl = (
    minPrice?: string,
    maxPrice?: string,
  ) => {
    const params = new URLSearchParams();

    Object.entries(currentParams).forEach(([param, paramValue]) => {
      if (
        paramValue &&
        param !== "page" &&
        param !== "minPrice" &&
        param !== "maxPrice"
      ) {
        params.set(param, paramValue);
      }
    });

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    return `/products?${params.toString()}`;
  };

  return (
    <aside className={styles.sidebar} aria-label="Product filters">
      <div className={styles.section}>
        <h2>FILTER BY</h2>

        <div className={styles.group}>
          <h3>CATEGORY</h3>

          <Link
            href={createFilterUrl("category")}
            className={!currentParams.category ? styles.active : ""}
          >
            All
          </Link>

          {categories.map((category) => (
            <Link
              key={category.id}
              href={createFilterUrl("category", category.name)}
              className={
                currentParams.category === category.name
                  ? styles.active
                  : ""
              }
            >
              {category.name}
            </Link>
          ))}
        </div>

        <div className={styles.group}>
          <h3>PRICE</h3>

          <Link
            href={createPriceUrl()}
            className={
              !currentParams.minPrice && !currentParams.maxPrice
                ? styles.active
                : ""
            }
          >
            All prices
          </Link>

          <Link
            href={createPriceUrl(undefined, "50")}
            className={currentParams.maxPrice === "50" ? styles.active : ""}
          >
            Under $50
          </Link>

          <Link
            href={createPriceUrl("50", "75")}
            className={
              currentParams.minPrice === "50" &&
              currentParams.maxPrice === "75"
                ? styles.active
                : ""
            }
          >
            $50 - $75
          </Link>

          <Link
            href={createPriceUrl("75", "100")}
            className={
              currentParams.minPrice === "75" &&
              currentParams.maxPrice === "100"
                ? styles.active
                : ""
            }
          >
            $75 - $100
          </Link>

          <Link
            href={createPriceUrl("100")}
            className={currentParams.minPrice === "100" ? styles.active : ""}
          >
            $100+
          </Link>
        </div>
      </div>
    </aside>
  );
}