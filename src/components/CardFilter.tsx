"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";

const categories = ["Shirts", "Trousers", "Sweatshirts", "Foot Wears"];

export default function CardFilter() {
  const products = [1, 2, 3,4,5,6];

  const [selectedCategory, setSelectedCategory] = useState("");

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
          {products.map((el) => (
            <ProductCard key={el} />
          ))}
        </div>
      </div>
    </div>
  );
}
