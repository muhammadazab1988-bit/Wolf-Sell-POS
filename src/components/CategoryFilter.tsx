"use client";

import { useState } from "react";
import { LuUser, LuFootprints } from "react-icons/lu";

const categories = [
  { id: "all", label: "All Products", icon: null },
  { id: "men", label: "Men", icon: LuUser },
  { id: "footwear", label: "Footwear", icon: LuFootprints },
  { id: "all", label: "All Products", icon: null },
  { id: "men", label: "Men", icon: LuUser },
  { id: "footwear", label: "Footwear", icon: LuFootprints },
  { id: "accessories", label: "Accessories", icon: null },
];

export default function CategoryFilter() {
  const [active, setActive] = useState("men");

  return (
    <div className="flex flex-wrap items-center gap-2 font-kameron sm:gap-3">
      {categories.map(({ id, label, icon: Icon }) => {
        const isActive = active === id;

        return (
          <button
            key={id}
            onClick={() => setActive(id)}
            className={`flex items-center gap-2 rounded-full border px-3 py-2.5 text-sm transition-all sm:px-4 sm:py-3 sm:text-base ${
              isActive
                ? "border-slate-900 bg-slate-900 text-white"
                : "border-slate-200 bg-white text-slate-400 hover:border-slate-100"
            }`}
          >
            {Icon && (
              <Icon
                className={`h-5 w-5 ${isActive ? "text-white" : "text-slate-300"}`}
              />
            )}
            <span className="font-normal">{label}</span>
          </button>
        );
      })}
    </div>
  );
}
