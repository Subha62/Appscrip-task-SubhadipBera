// import { getCategories, getProducts } from "../../lib/api";
// import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
// import Header from "../../components/Header/Header";
// import Pagination from "../../components/Pagination/Pagination";
// import ProductGrid from "../../components/ProductGrid/ProductGrid";
// import ProductHero from "../../components/ProductHero/ProductHero";
// import ProductToolbar from "../../components/ProductToolbar/ProductToolbar";
// import styles from "./page.module.css";
// import SearchBar from "../../components/SearchBar/SearchBar";
// import Footer from "../../components/Footer/Footer";

// interface ProductsPageProps {
//     searchParams: Promise<{
//         page?: string;
//         limit?: string;
//         category?: string;
//         minPrice?: string;
//         maxPrice?: string;
//         sort?: string;
//         q?: string;
//     }>;
// }

// export default async function ProductsPage({
//     searchParams,
// }: ProductsPageProps) {
//     const params = await searchParams;

//     const searchParamsObject = new URLSearchParams();

//     if (params.page) {
//         searchParamsObject.set("page", params.page);
//     }

//     if (params.limit) {
//         searchParamsObject.set("limit", params.limit);
//     }

//     if (params.category) {
//         searchParamsObject.set("category", params.category);
//     }

//     if (params.minPrice) {
//         searchParamsObject.set("minPrice", params.minPrice);
//     }

//     if (params.maxPrice) {
//         searchParamsObject.set("maxPrice", params.maxPrice);
//     }

//     if (params.sort) {
//         searchParamsObject.set("sort", params.sort);
//     }

//     if (params.q) {
//         searchParamsObject.set("q", params.q);
//     }

//     const [data, categoryData] = await Promise.all([
//         getProducts(searchParamsObject.toString()),
//         getCategories(),
//     ]);

//     const currentParams: Record<string, string | undefined> = {
//         page: params.page,
//         limit: params.limit,
//         category: params.category,
//         minPrice: params.minPrice,
//         maxPrice: params.maxPrice,
//         sort: params.sort,
//         q: params.q,
//     };

//     return (
//         <div className={styles.page}>
//             <Header />

//             <main>
//                 <ProductHero />

//                 <div className={styles.content}>
//                     <div className={styles.productsSection}>
//                         <SearchBar currentQuery={params.q} />
//                         <ProductToolbar
//                             totalItems={data.pagination.total}
//                             currentParams={currentParams}
//                             categories={categoryData.categories}
//                         />

//                         <div className={styles.catalog}>
//                             <FilterSidebar
//                                 categories={categoryData.categories}
//                                 currentParams={currentParams}
//                             />

//                             <div className={styles.products}>
//                                 <ProductGrid products={data.products} />

//                                 <Pagination
//                                     currentPage={data.pagination.page}
//                                     totalPages={data.pagination.totalPages}
//                                     currentParams={currentParams}
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//             <Footer/>
//         </div>
//     );
// }




import { getCategories, getProducts } from "../../lib/api";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import Pagination from "../../components/Pagination/Pagination";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import ProductHero from "../../components/ProductHero/ProductHero";
import ProductToolbar from "../../components/ProductToolbar/ProductToolbar";
import SearchBar from "../../components/SearchBar/SearchBar";
import styles from "./page.module.css";

interface ProductsPageProps {
    searchParams: Promise<{
        page?: string;
        limit?: string;
        category?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        q?: string;
    }>;
}

export default async function ProductsPage({
    searchParams,
}: ProductsPageProps) {
    const params = await searchParams;

    const searchParamsObject = new URLSearchParams();

    if (params.page) {
        searchParamsObject.set("page", params.page);
    }

    if (params.limit) {
        searchParamsObject.set("limit", params.limit);
    }

    if (params.category) {
        searchParamsObject.set("category", params.category);
    }

    if (params.minPrice) {
        searchParamsObject.set("minPrice", params.minPrice);
    }

    if (params.maxPrice) {
        searchParamsObject.set("maxPrice", params.maxPrice);
    }

    if (params.sort) {
        searchParamsObject.set("sort", params.sort);
    }

    if (params.q) {
        searchParamsObject.set("q", params.q);
    }

    const [data, categoryData] = await Promise.all([
        getProducts(searchParamsObject.toString()),
        getCategories(),
    ]);

    const currentParams: Record<string, string | undefined> = {
        page: params.page,
        limit: params.limit,
        category: params.category,
        minPrice: params.minPrice,
        maxPrice: params.maxPrice,
        sort: params.sort,
        q: params.q,
    };

    const siteUrl =
        process.env.NEXT_PUBLIC_SITE_URL ||
        "http://localhost:3000";

    const structuredData = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Discover Our Products",
        description:
            "Explore our collection of thoughtfully designed products.",
        numberOfItems: data.products.length,
        itemListElement: data.products.map((product, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
                "@type": "Product",
                name: product.title,
                description: product.description,
                image: product.images.map((image) => image.url),
                category: product.category.name,
                url: `${siteUrl}/products`,
                offers: {
                    "@type": "Offer",
                    price: product.price,
                    priceCurrency: "USD",
                    availability:
                        product.stock > 0
                            ? "https://schema.org/InStock"
                            : "https://schema.org/OutOfStock",
                },
            },
        })),
    };

    return (
        <div className={styles.page}>
            <Header />

            <main>
                <ProductHero />

                <div className={styles.content}>
                    <div className={styles.productsSection}>
                        <SearchBar currentQuery={params.q} />

                        <ProductToolbar
                            totalItems={data.pagination.total}
                            currentParams={currentParams}
                            categories={categoryData.categories}
                        />

                        <div className={styles.catalog}>
                            <FilterSidebar
                                categories={categoryData.categories}
                                currentParams={currentParams}
                            />

                            <div className={styles.products}>
                                <ProductGrid products={data.products} />

                                <Pagination
                                    currentPage={data.pagination.page}
                                    totalPages={data.pagination.totalPages}
                                    currentParams={currentParams}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData).replace(
                        /</g,
                        "\\u003c"
                    ),
                }}
            />
        </div>
    );
}