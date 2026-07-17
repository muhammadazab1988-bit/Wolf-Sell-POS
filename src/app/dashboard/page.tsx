"use client";

import { useState } from "react";
import {
  Wallet,
  ShoppingBag,
  Package,
  AlertTriangle,
  Users,
  UserCircle2,
  ShoppingCart,
  Phone,
  ChevronDown,
  Menu,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

/* ------------------------------------------------------------------ */
/*  Mock data — swap for real data from your API / DB                  */
/* ------------------------------------------------------------------ */

const salesData = [
  { month: "Jan", purchase: 42, sales: 18 },
  { month: "Feb", purchase: 20, sales: 12 },
  { month: "Mar", purchase: 44, sales: 22 },
  { month: "Apr", purchase: 18, sales: 10 },
  { month: "May", purchase: 46, sales: 30 },
  { month: "Jun", purchase: 26, sales: 18 },
  { month: "Jul", purchase: 22, sales: 14 },
  { month: "Aug", purchase: 24, sales: 12 },
  { month: "Sep", purchase: 50, sales: 44 },
  { month: "Oct", purchase: 30, sales: 22 },
  { month: "Nov", purchase: 46, sales: 38 },
  { month: "Dec", purchase: 34, sales: 24 },
];

const comparisonData = [
  { day: "Sunday", value: 8 },
  { day: "Monday", value: 12 },
  { day: "Tuesday", value: 9 },
  { day: "Wednesday", value: 18 },
  { day: "Thursday", value: 14 },
  { day: "Friday", value: 25 },
  { day: "Saturday", value: 11 },
];

const employees = [
  {
    name: "Alice Johnson",
    role: "Counter 1",
    hours: "4h 30m",
    status: "Active",
    initials: "AJ",
  },
  {
    name: "Sarah Kim",
    role: "Inventory",
    hours: "3h 45m",
    status: "Break",
    initials: "SK",
    highlighted: true,
  },
  {
    name: "Carter Dias",
    role: "Counter 2",
    hours: "9h 05m",
    status: "Offline",
    initials: "CD",
  },
];

const statusStyles: Record<string, string> = {
  Active: "bg-amber-50 text-amber-700",
  Break: "bg-amber-400/20 text-amber-50",
  Offline: "bg-black/10 text-black/60",
};

const dotStyles: Record<string, string> = {
  Active: "bg-amber-600",
  Break: "bg-amber-300",
  Offline: "bg-black/40",
};

const ranges = ["1D", "1W", "1M", "3M", "6M", "1Y"];

/* ------------------------------------------------------------------ */
/*  Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Card({
  className = "",
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`rounded-2xl border border-amber-100 bg-white shadow-sm shadow-black/5 ${className}`}
    >
      {children}
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  badge,
  period,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  badge: string;
  period: string;
}) {
  return (
    <Card className="flex-1 p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-amber-50">
          {icon}
        </div>
        <button className="flex items-center gap-1 rounded-full border border-amber-100 px-3 py-1 text-xs font-medium text-black/60">
          {period}
          <ChevronDown className="h-3 w-3" />
        </button>
      </div>
      <p className="mt-4 text-sm text-black/50">{label}</p>
      <div className="mt-1 flex items-center gap-2">
        <span className="text-2xl font-semibold text-black">{value}</span>
        <span className="rounded-md bg-amber-600 px-1.5 py-0.5 text-xs font-semibold text-amber-50">
          {badge}
        </span>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function DashboardPage() {
  const [range, setRange] = useState("1Y");
  const [productTab, setProductTab] = useState<"casual" | "traditional">(
    "casual"
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-amber-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* min-w-0 is required so this column can shrink instead of being
          pushed off-screen by its children (charts especially) */}
      <div className="flex min-h-screen min-w-0 flex-1 flex-col">
        {/* Mobile-only top bar: this is what opens the sidebar drawer.
            Hidden on lg because the sidebar is static/always visible there. */}
        <div className="flex items-center justify-between bg-black px-4 py-3 lg:hidden">
          <span className="text-lg font-bold text-white">Wolf Sell</span>
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-amber-50 hover:bg-white/10"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 p-3 sm:p-4 lg:p-6">
          <Header />

          <div className="mx-auto mt-4 flex w-full max-w-7xl flex-col gap-4 sm:gap-6">
            {/* ---------- Top stat cards ---------- */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={<Wallet className="h-5 w-5" />}
                label="Total Revenue"
                value="$250,100"
                badge="+10%"
                period="This Month"
              />
              <StatCard
                icon={<ShoppingBag className="h-5 w-5" />}
                label="Daily Sales"
                value="$80,100"
                badge="+10%"
                period="Today"
              />
              <StatCard
                icon={<Package className="h-5 w-5" />}
                label="Orders Processed"
                value="1.2K"
                badge="+10%"
                period="Today"
              />
              <StatCard
                icon={<AlertTriangle className="h-5 w-5" />}
                label="Low Stock"
                value="3 Items"
                badge="Alert"
                period="Today"
              />
            </div>

            {/* ---------- Sales chart + Overall info ---------- */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              {/* Sales & Purchase */}
              <Card className="p-6 xl:col-span-2">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-amber-600" />
                    <h2 className="font-semibold text-black">
                      Sales &amp; Purchase
                    </h2>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-amber-50 p-1">
                    {ranges.map((r) => (
                      <button
                        key={r}
                        onClick={() => setRange(r)}
                        className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                          range === r
                            ? "bg-amber-600 text-amber-50"
                            : "text-black/50 hover:text-black"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-4 sm:gap-8">
                  <div>
                    <div className="flex items-center gap-2 text-sm text-black/50">
                      <span className="h-2 w-2 rounded-full bg-amber-200" />
                      Total Purchase
                    </div>
                    <p className="text-xl font-semibold text-black">49K</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-sm text-black/50">
                      <span className="h-2 w-2 rounded-full bg-amber-600" />
                      Total Sales
                    </div>
                    <p className="text-xl font-semibold text-black">38K</p>
                  </div>
                </div>

                <div className="mt-4 h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData} barGap={2}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#00000080", fontSize: 12 }}
                      />
                      <Tooltip
                        cursor={{ fill: "#FFFBEB" }}
                        contentStyle={{
                          borderRadius: 12,
                          border: "1px solid #FDE68A",
                        }}
                      />
                      <Bar
                        dataKey="purchase"
                        fill="#FDE68A"
                        radius={[6, 6, 0, 0]}
                        barSize={10}
                      />
                      <Bar
                        dataKey="sales"
                        fill="#D97706"
                        radius={[6, 6, 0, 0]}
                        barSize={10}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Overall Information */}
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <UserCircle2 className="h-5 w-5 text-amber-600" />
                  <h2 className="font-semibold text-black">
                    Overall Information
                  </h2>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-3 text-center sm:grid-cols-3">
                  <div className="rounded-xl bg-amber-50 p-3">
                    <Users className="mx-auto h-5 w-5 text-amber-600" />
                    <p className="mt-2 text-sm font-semibold text-black">
                      6987
                    </p>
                    <p className="text-xs text-black/50">Suppliers</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-3">
                    <UserCircle2 className="mx-auto h-5 w-5 text-amber-600" />
                    <p className="mt-2 text-sm font-semibold text-black">
                      4896
                    </p>
                    <p className="text-xs text-black/50">Customer</p>
                  </div>
                  <div className="rounded-xl bg-amber-50 p-3">
                    <ShoppingCart className="mx-auto h-5 w-5 text-amber-600" />
                    <p className="mt-2 text-sm font-semibold text-black">
                      487
                    </p>
                    <p className="text-xs text-black/50">Orders</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-black">
                    Customers Overview
                  </h3>
                  <button className="flex items-center gap-1 rounded-full border border-amber-100 px-3 py-1 text-xs text-black/50">
                    Today <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                  <div className="relative h-24 w-24 shrink-0">
                    <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="#FDE68A"
                        strokeWidth="4"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="15.5"
                        fill="none"
                        stroke="#D97706"
                        strokeWidth="4"
                        strokeDasharray="61 97"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="text-lg font-semibold text-amber-600">
                        5.5K
                      </p>
                      <p className="text-xs text-black/50">
                        First Time <span className="text-amber-600">+ 25%</span>
                      </p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-black">3.5K</p>
                      <p className="text-xs text-black/50">
                        Return <span className="text-amber-600">+ 21%</span>
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* ---------- Product comparison + Employees ---------- */}
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Product Comparison */}
              <Card className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-semibold text-black">
                    Product Comparison
                  </h2>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setProductTab("casual")}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        productTab === "casual"
                          ? "bg-black text-amber-50"
                          : "bg-amber-50 text-black/50"
                      }`}
                    >
                      Casual Clothes
                    </button>
                    <button
                      onClick={() => setProductTab("traditional")}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        productTab === "traditional"
                          ? "bg-black text-amber-50"
                          : "bg-amber-50 text-black/50"
                      }`}
                    >
                      Traditional Clothes
                    </button>
                  </div>
                </div>

                <div className="mt-6 h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={comparisonData}>
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: "#00000080", fontSize: 11 }}
                      />
                      <Tooltip
                        cursor={{ stroke: "#D97706", strokeDasharray: "4 4" }}
                        contentStyle={{
                          borderRadius: 12,
                          border: "none",
                          background: "#D97706",
                          color: "#FFFBEB",
                        }}
                        formatter={(v: number) => [`${v}%`, "Selling Rate"]}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#D97706"
                        strokeWidth={2}
                        dot={false}
                        activeDot={{ r: 5, fill: "#D97706" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              {/* Employees */}
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-amber-600" />
                    <h2 className="font-semibold text-black">Employees</h2>
                  </div>
                  <button className="flex items-center gap-1 rounded-full border border-amber-100 px-3 py-1 text-xs text-black/50">
                    This Month <ChevronDown className="h-3 w-3" />
                  </button>
                </div>

                <div className="mt-4 flex flex-col gap-2">
                  {employees.map((emp) => (
                    <div
                      key={emp.name}
                      className={`flex items-center justify-between rounded-xl p-3 ${
                        emp.highlighted
                          ? "bg-black text-amber-50"
                          : "bg-amber-50/60 text-black"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold ${
                            emp.highlighted
                              ? "bg-amber-600 text-amber-50"
                              : "bg-amber-600/90 text-amber-50"
                          }`}
                        >
                          {emp.initials}
                        </div>
                        <div>
                          <p className="text-sm font-medium">{emp.name}</p>
                          <p
                            className={`text-xs ${
                              emp.highlighted
                                ? "text-amber-100/70"
                                : "text-black/50"
                            }`}
                          >
                            {emp.role}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                        <div className="text-right">
                          <p
                            className={`text-xs ${
                              emp.highlighted
                                ? "text-amber-100/70"
                                : "text-black/50"
                            }`}
                          >
                            Working Hours
                          </p>
                          <p className="text-sm font-medium">{emp.hours}</p>
                        </div>
                        <span
                          className={`flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                            emp.highlighted
                              ? "bg-white/10 text-amber-50"
                              : statusStyles[emp.status]
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              dotStyles[emp.status]
                            }`}
                          />
                          {emp.status}
                        </span>
                        <button
                          className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium ${
                            emp.highlighted
                              ? "bg-amber-600 text-amber-50"
                              : "bg-black text-amber-50"
                          }`}
                        >
                          <Phone className="h-3 w-3" />
                          Call
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}