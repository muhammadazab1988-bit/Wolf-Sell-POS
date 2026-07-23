"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "@/lib/strapi";

// "All Products" بيمثل بعرض كل حاجة من غير فلترة
const categories = ["T-Shirts", "Trousers","Foot Wears"];

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

export default function CardFilter() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Products");

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.log("حصل خطأ في جلب المنتجات:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // لو "All Products" مختارة، اعرض كل حاجة من غير فلترة
  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category?.name === selectedCategory);

  return (
    <div className="container h-auto overflow-hidden rounded-2xl border border-amber-200 bg-amber-50 p-3 sm:p-4">
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-[220px_minmax(0,1fr)]">
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex w-full items-center justify-between rounded-xl border px-4 py-4 text-left font-semibold shadow-sm ${
                selectedCategory === category
                  ? "border-amber-600 bg-amber-600 text-white"
                  : "border-base-200 bg-black hover:bg-base-200"
              }`}
            >
              <span>{category}</span>
              <span className="text-xl">›</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {loading && <p>جاري تحميل المنتجات...</p>}

          {!loading && filteredProducts.length === 0 && (
            <p>لا توجد منتجات</p>
          )}

          {!loading &&
            filteredProducts.map((product) => {
              const imageUrl = product.coverImage?.url
                ? `${STRAPI_URL}${product.coverImage.url}`
                : "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp";

              return (
                <ProductCard
                  key={product.id}
                  name={product.name}
                  price={product.price}
                  imageUrl={imageUrl}
                  onBuy={() => console.log("تم اختيار:", product.name)}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}