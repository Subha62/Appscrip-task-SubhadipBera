"use client";

import Link from "next/link";
import { useState } from "react";
import type { Category } from "../../types/product";
import styles from "./ProductToolbar.module.css";

interface ProductToolbarProps {
  totalItems: number;
  currentParams: Record<string, string | undefined>;
  categories: Category[];
}

export default function ProductToolbar({
  totalItems,
  currentParams,
  categories,
}: ProductToolbarProps) {
  const [filterOpen, setFilterOpen] = useState(false);

  const createSortUrl = (sort?: string) => {
    const params = new URLSearchParams();

    Object.entries(currentParams).forEach(([key, value]) => {
      if (
        value &&
        key !== "page" &&
        key !== "sort"
      ) {
        params.set(key, value);
      }
    });

    if (sort && sort !== "recommended") {
      params.set("sort", sort);
    }

    const query = params.toString();

    return query ? `/products?${query}` : "/products";
  };

  const createFilterUrl = (
    key: string,
    value?: string
  ) => {
    const params = new URLSearchParams();

    Object.entries(currentParams).forEach(
      ([param, paramValue]) => {
        if (
          paramValue &&
          param !== key &&
          param !== "page" &&
          param !== "minPrice" &&
          param !== "maxPrice"
        ) {
          params.set(param, paramValue);
        }
      }
    );

    if (value) {
      params.set(key, value);
    }

    const query = params.toString();

    return query ? `/products?${query}` : "/products";
  };

  const createPriceUrl = (
    minPrice?: string,
    maxPrice?: string
  ) => {
    const params = new URLSearchParams();

    Object.entries(currentParams).forEach(
      ([param, paramValue]) => {
        if (
          paramValue &&
          param !== "page" &&
          param !== "minPrice" &&
          param !== "maxPrice"
        ) {
          params.set(param, paramValue);
        }
      }
    );

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    const query = params.toString();

    return query ? `/products?${query}` : "/products";
  };

  const currentSort =
    currentParams.sort || "recommended";

  const sortLabel =
    currentSort === "price-asc"
      ? "PRICE: LOW TO HIGH"
      : currentSort === "price-desc"
        ? "PRICE: HIGH TO LOW"
        : currentSort === "rating"
          ? "TOP RATED"
          : currentSort === "newest"
            ? "NEWEST"
            : "RECOMMENDED";

  const currentCategory =
    currentParams.category || "";

  return (
    <div className={styles.toolbar}>
      <p className={styles.count}>
        {totalItems} ITEMS
      </p>

      <div className={styles.actions}>

        {/* Mobile Filter */}
        <div className={styles.filterMenu}>
          <button
            type="button"
            className={styles.filterButton}
            onClick={() =>
              setFilterOpen((previous) => !previous)
            }
            aria-expanded={filterOpen}
          >
            FILTER
          </button>

          {filterOpen && (
            <div className={styles.filterPanel}>
              <div className={styles.filterHeader}>
                <h2>FILTER BY</h2>

                <button
                  type="button"
                  className={styles.closeButton}
                  onClick={() => setFilterOpen(false)}
                  aria-label="Close filters"
                >
                  ×
                </button>
              </div>

              <div className={styles.filterGroup}>
                <h3>CATEGORY</h3>

                <Link
                  href={createFilterUrl("category")}
                  className={
                    !currentCategory
                      ? styles.active
                      : ""
                  }
                  onClick={() => setFilterOpen(false)}
                >
                  All
                </Link>

                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={createFilterUrl(
                      "category",
                      category.name
                    )}
                    className={
                      currentCategory === category.name
                        ? styles.active
                        : ""
                    }
                    onClick={() => setFilterOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              <div className={styles.filterGroup}>
                <h3>PRICE</h3>

                <Link
                  href={createPriceUrl()}
                  className={
                    !currentParams.minPrice &&
                    !currentParams.maxPrice
                      ? styles.active
                      : ""
                  }
                  onClick={() => setFilterOpen(false)}
                >
                  All prices
                </Link>

                <Link
                  href={createPriceUrl(undefined, "50")}
                  className={
                    currentParams.maxPrice === "50"
                      ? styles.active
                      : ""
                  }
                  onClick={() => setFilterOpen(false)}
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
                  onClick={() => setFilterOpen(false)}
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
                  onClick={() => setFilterOpen(false)}
                >
                  $75 - $100
                </Link>

                <Link
                  href={createPriceUrl("100")}
                  className={
                    currentParams.minPrice === "100"
                      ? styles.active
                      : ""
                  }
                  onClick={() => setFilterOpen(false)}
                >
                  $100+
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Sort */}
        <details className={styles.sortMenu}>
          <summary className={styles.sortButton}>
            {sortLabel}
            <span aria-hidden="true">⌄</span>
          </summary>

          <div className={styles.sortOptions}>
            <Link
              href={createSortUrl("recommended")}
              className={
                currentSort === "recommended"
                  ? styles.active
                  : ""
              }
            >
              RECOMMENDED
            </Link>

            <Link
              href={createSortUrl("newest")}
              className={
                currentSort === "newest"
                  ? styles.active
                  : ""
              }
            >
              NEWEST
            </Link>

            <Link
              href={createSortUrl("price-asc")}
              className={
                currentSort === "price-asc"
                  ? styles.active
                  : ""
              }
            >
              PRICE: LOW TO HIGH
            </Link>

            <Link
              href={createSortUrl("price-desc")}
              className={
                currentSort === "price-desc"
                  ? styles.active
                  : ""
              }
            >
              PRICE: HIGH TO LOW
            </Link>

            <Link
              href={createSortUrl("rating")}
              className={
                currentSort === "rating"
                  ? styles.active
                  : ""
              }
            >
              TOP RATED
            </Link>
          </div>
        </details>
      </div>
    </div>
  );
}