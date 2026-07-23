"use client";

import { useState, type ReactNode } from "react";
import { useAuthGuard } from "@/lib/useAuthGuard";
import {
  LuBox,
  LuCircleEllipsis,
  LuCirclePlus,
  LuShieldAlert,
  LuTruck,
} from "react-icons/lu";
import Sidebar from "@/components/Sidebar";

type Status = "In Stock" | "Low Stock" | "Out of Stock";

const stock = [
  [
    "Classic Cotton Tee (White)",
    "Men's T-shirts",
    150,
    "2 Days Ago",
    "In Stock",
  ],
  ["Oversized Graphic Tee", "Men's T-shirts", 22, "7 Days Ago", "Low Stock"],
  ["Slim Fit Blue Jeans (32)", "Jeans", 0, "7 Days Ago", "Out of Stock"],
  ["Black Stretch Denim (30)", "Jeans", 40, "1 Days Ago", "In Stock"],
  ["Floral Printed Top", "Women's Tops", 15, "4 Days Ago", "Out of Stock"],
  ["Satin Cami Top (Pink)", "Women's Tops", 60, "6 Days Ago", "In Stock"],
  ["White Sneakers (UK 7)", "Footwear", 12, "6 Days Ago", "Low Stock"],
  ["Running Shoes (UK 9)", "Footwear", 50, "3 Days Ago", "In Stock"],
  ["Leather Belt (Brown)", "Accessories", 150, "4 Days Ago", "In Stock"],
  ["Canvas Tote Bag", "Household", 150, "4 Days Ago", "In Stock"],
] as const;

const orders = [
  [
    "#ORD5671",
    "Urban Threads Co.",
    "150 Cotton Tees",
    "Mar 8, 2025",
    "In Transit",
  ],
  ["#ORD5672", "Denim Masters", "80 Blue Jeans", "Mar 5, 2025", "Approval"],
  ["#ORD5673", "Fashion Hub", "200 Women Tops", "Mar 6, 2025", "Delivered"],
  ["#ORD5674", "SoleFlex Footwear", "120 Sneakers", "Mar 10, 2025", "Approval"],
  [
    "#ORD2455",
    "Accessory Depot",
    "90 Loafers Belts",
    "Mar 12, 2025",
    "In Transit",
  ],
] as const;

const expiry = [
  ["Classic Cotton Tee (White)", 3, "Mar 6, 2025"],
  ["Black Stretch Denim (30)", 2, "Mar 8, 2025"],
  ["White Sneakers (UK 7)", 3, "Mar 5, 2025"],
  ["Canvas Tote Bag", 4, "Mar 10, 2025"],
] as const;

function StatusDot({ status }: { status: Status }) {
  const color =
    status === "In Stock"
      ? "bg-amber-600"
      : status === "Low Stock"
      ? "bg-yellow-500"
      : "bg-black";
  return (
    <span className="flex items-center justify-end gap-1.5 text-[10px] font-semibold text-stone-600">
      <i className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {status}
    </span>
  );
}

export default function InventoryPage() {
  const ready = useAuthGuard();
  const [selectedProduct, setSelectedProduct] = useState("Floral Printed Top");
  const [notice, setNotice] = useState("");

  if (!ready) return null;

  return (
    <main className="flex min-h-screen bg-amber-50 font-kameron text-black">
      <Sidebar />
      <section className="min-w-0 flex-1 p-3 sm:p-5 lg:p-7">
        <div className="grid gap-4 xl:grid-cols-[minmax(330px,.92fr)_minmax(480px,1fr)]">
          <section className="rounded-2xl border border-amber-100 bg-white/70 p-3 shadow-sm">
            <PanelTitle icon={<LuBox />} title="Product List & Stock" />
            <div className="mt-3 grid gap-1.5">
              {stock.map(([name, category, count, restocked, status]) => (
                <button
                  type="button"
                  key={name}
                  onClick={() => setSelectedProduct(name)}
                  className={`grid w-full grid-cols-[minmax(120px,1.35fr)_minmax(70px,.7fr)_minmax(75px,.75fr)_minmax(70px,.65fr)] items-center gap-2 rounded-xl px-2.5 py-2.5 text-left transition sm:px-3 ${
                    selectedProduct === name
                      ? "bg-black text-amber-50 shadow-lg"
                      : "border border-amber-100/80 bg-amber-50/70 hover:border-amber-600"
                  }`}
                >
                  <div>
                    <p className="truncate text-[11px] font-bold sm:text-xs">
                      {name}
                    </p>
                    <p
                      className={`mt-0.5 text-[9px] ${
                        selectedProduct === name
                          ? "text-amber-100"
                          : "text-stone-500"
                      }`}
                    >
                      {category}
                    </p>
                  </div>
                  <div>
                    <p
                      className={`text-[9px] ${
                        selectedProduct === name
                          ? "text-amber-100"
                          : "text-stone-500"
                      }`}
                    >
                      Stock Available
                    </p>
                    <p className="text-[11px] font-bold">{count}</p>
                  </div>
                  <div>
                    <p
                      className={`text-[9px] ${
                        selectedProduct === name
                          ? "text-amber-100"
                          : "text-stone-500"
                      }`}
                    >
                      Last Restocked
                    </p>
                    <p className="text-[11px] font-bold">{restocked}</p>
                  </div>
                  <StatusDot status={status} />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setNotice("Order stock action opened.")}
              className="mx-auto mt-3 flex h-10 items-center gap-2 rounded-2xl bg-amber-600 px-6 text-xs font-bold text-black shadow-[0_8px_18px_rgba(217,119,6,0.2)] hover:bg-amber-500"
            >
              <LuCirclePlus className="h-4 w-4" />
              Order stock
            </button>
          </section>

          <div className="grid content-start gap-4">
            <section className="rounded-2xl border border-amber-100 bg-white/70 p-3 shadow-sm">
              <PanelTitle
                icon={<LuTruck />}
                title="Restock & Supplier Orders"
              />
              <div className="mt-3 grid gap-1.5">
                {orders.map(([id, supplier, items, delivery, status]) => (
                  <article
                    key={id}
                    className={`grid grid-cols-[.75fr_1.2fr_1fr_1fr_auto] items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-3 text-[10px] ${
                      status === "Delivered" ? "bg-black text-amber-50" : ""
                    }`}
                  >
                    <Info
                      label="Order ID"
                      value={id}
                      inverse={status === "Delivered"}
                    />
                    <Info
                      label="Supplier"
                      value={supplier}
                      inverse={status === "Delivered"}
                    />
                    <Info
                      label="Items ordered"
                      value={items}
                      inverse={status === "Delivered"}
                    />
                    <Info
                      label="Expected delivery"
                      value={delivery}
                      inverse={status === "Delivered"}
                    />
                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                        status === "Delivered"
                          ? "bg-amber-600 text-black"
                          : "bg-amber-100 text-stone-600"
                      }`}
                    >
                      {status}
                    </span>
                  </article>
                ))}
              </div>
            </section>
            <section className="rounded-2xl border border-amber-100 bg-white/70 p-3 shadow-sm">
              <PanelTitle
                icon={<LuShieldAlert />}
                title="Expiry & Waste Management"
              />
              <div className="mt-3 grid gap-1.5">
                {expiry.map(([name, itemsMarked, expected]) => (
                  <article
                    key={name}
                    className={`grid grid-cols-[1.25fr_.7fr_.9fr_auto] items-center gap-2 rounded-xl border border-amber-100 bg-amber-50/70 px-3 py-3 text-[10px] ${
                      selectedProduct === name ? "bg-black text-amber-50" : ""
                    }`}
                  >
                    <div>
                      <p className="font-bold">{name}</p>
                    </div>
                    <Info
                      label="Items marked"
                      value={String(itemsMarked)}
                      inverse={selectedProduct === name}
                    />
                    <Info
                      label="Expected delivery"
                      value={expected}
                      inverse={selectedProduct === name}
                    />
                    <button
                      type="button"
                      onClick={() => setNotice(`${name} marked as removed.`)}
                      className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-bold text-black hover:bg-amber-600"
                    >
                      Remove
                    </button>
                  </article>
                ))}
              </div>
            </section>
          </div>
        </div>
        {notice && (
          <p
            className="mt-4 text-sm font-bold text-amber-600"
            aria-live="polite"
          >
            {notice}
          </p>
        )}
      </section>
    </main>
  );
}

function PanelTitle({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <header className="flex items-center justify-between px-1">
      <div className="flex items-center gap-3">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-600">
          {icon}
        </span>
        <h1 className="text-sm font-bold sm:text-base">{title}</h1>
      </div>
      <LuCircleEllipsis className="h-5 w-5 text-stone-500" />
    </header>
  );
}

function Info({
  label,
  value,
  inverse,
}: {
  label: string;
  value: string;
  inverse?: boolean;
}) {
  return (
    <div>
      <p
        className={`text-[8px] ${
          inverse ? "text-amber-100" : "text-stone-500"
        }`}
      >
        {label}
      </p>
      <p className="mt-0.5 truncate font-bold">{value}</p>
    </div>
  );
}
