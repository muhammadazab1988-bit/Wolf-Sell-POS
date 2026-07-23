"use client";
import { useAuthGuard } from "@/lib/useAuthGuard";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { useMemo, useState, type ReactNode } from "react";
import {
  LuCalendarDays,
  LuChevronRight,
  LuCirclePlus,
  LuMail,
  LuPhone,
  LuSearch,
  LuStickyNote,
  LuUserRound,
} from "react-icons/lu";

type Customer = {
  id: string;
  name: string;
  email: string;
  points: number;
  initials: string;
  tone: string;
  spent: number;
  orders: number;
  lastPurchase: string;
  joined: string;
  phone: string;
};

const customers: Customer[] = [
  {
    id: "1023",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    points: 1240,
    initials: "EW",
    tone: "bg-amber-600",
    spent: 4820.5,
    orders: 28,
    lastPurchase: "2 days ago",
    joined: "March 12, 2023",
    phone: "+1 (555) 012-3456",
  },
  {
    id: "1024",
    name: "Liam Johnson",
    email: "liam.j@example.com",
    points: 850,
    initials: "LJ",
    tone: "bg-black",
    spent: 2505,
    orders: 15,
    lastPurchase: "5 days ago",
    joined: "April 04, 2023",
    phone: "+1 (555) 012-7612",
  },
  {
    id: "1025",
    name: "Sarah Parker",
    email: "sarah.p@example.com",
    points: 2100,
    initials: "SP",
    tone: "bg-amber-500",
    spent: 6910.25,
    orders: 34,
    lastPurchase: "1 day ago",
    joined: "January 16, 2022",
    phone: "+1 (555) 012-8802",
  },
  {
    id: "1026",
    name: "Michael Chen",
    email: "m.chen@example.com",
    points: 420,
    initials: "MC",
    tone: "bg-stone-700",
    spent: 980,
    orders: 7,
    lastPurchase: "2 weeks ago",
    joined: "July 29, 2024",
    phone: "+1 (555) 012-1921",
  },
  {
    id: "1027",
    name: "Olivia Davis",
    email: "olivia.d@example.com",
    points: 1560,
    initials: "OD",
    tone: "bg-orange-700",
    spent: 3780.75,
    orders: 20,
    lastPurchase: "4 days ago",
    joined: "October 08, 2022",
    phone: "+1 (555) 012-5448",
  },
  {
    id: "1028",
    name: "David Miller",
    email: "david.m@example.com",
    points: 980,
    initials: "DM",
    tone: "bg-stone-950",
    spent: 2290.4,
    orders: 13,
    lastPurchase: "1 week ago",
    joined: "May 20, 2023",
    phone: "+1 (555) 012-9091",
  },
  {
    id: "1029",
    name: "Sophia Brown",
    email: "sophia.b@example.com",
    points: 120,
    initials: "SB",
    tone: "bg-yellow-700",
    spent: 430,
    orders: 3,
    lastPurchase: "3 weeks ago",
    joined: "November 02, 2024",
    phone: "+1 (555) 012-4510",
  },
];

const orders = [
  ["1023", "Oct 24, 2024", "9 items", "$288.82", "Completed"],
  ["0988", "Oct 12, 2024", "3 items", "$145.20", "Completed"],
  ["0942", "Sep 28, 2024", "12 items", "$612.00", "Refunded"],
  ["0812", "Aug 15, 2024", "5 items", "$210.50", "Completed"],
  ["0754", "Jul 02, 2024", "2 items", "$89.99", "Completed"],
];

const money = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    amount,
  );

export default function CustomersPage() {
  const ready = useAuthGuard();
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("1023");
  const [notice, setNotice] = useState("");
  const selected =
    customers.find((customer) => customer.id === selectedId) ?? customers[0];
  const filteredCustomers = useMemo(
    () =>
      customers.filter((customer) =>
        `${customer.name} ${customer.email}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [query],
  );

  if (!ready) return null;
  return (
    <main className="min-h-screen overflow-x-hidden bg-amber-50 font-kameron text-black">
      <div className="flex flex-col lg:flex-row">
        <Sidebar />

        <div className="flex-1">
          <div className="p-3 sm:p-4 lg:p-6">
            <Header />

            <header className="mt-4 flex min-h-16 flex-col gap-3 border-b border-amber-100 bg-amber-50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <h1 className="text-lg font-bold sm:text-xl">
                Customer Management
              </h1>
              <div className="flex items-center gap-3">
                <div className="hidden text-right text-xs sm:block">
                  <p className="font-bold">James Lubin</p>
                  <p className="text-stone-500">Counter 1</p>
                </div>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-black text-xs font-bold text-amber-50">
                  JL
                </div>
              </div>
            </header>

            <div className="mt-4 grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)]">
              <aside className="rounded-2xl border border-amber-100 bg-white/70 p-3 sm:p-4">
                <div className="relative">
                  <LuSearch className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Search customers..."
                    className="h-11 w-full rounded-xl border border-amber-100 bg-amber-50 pl-10 pr-4 text-sm outline-none placeholder:text-stone-400 focus:border-amber-600"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setNotice("New customer form can open here.")}
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-amber-600 text-sm font-bold text-black shadow-[0_8px_18px_rgba(217,119,6,0.2)] transition hover:bg-amber-500"
                >
                  <LuCirclePlus className="h-4 w-4" />
                  Add new
                </button>
                <div className="mt-4 grid max-h-[58vh] gap-1 overflow-y-auto pr-1 sm:max-h-[60vh]">
                  {filteredCustomers.map((customer) => (
                    <button
                      type="button"
                      key={customer.id}
                      onClick={() => {
                        setSelectedId(customer.id);
                        setNotice("");
                      }}
                      className={`flex w-full items-center gap-3 rounded-xl p-2.5 text-left transition ${
                        selected.id === customer.id
                          ? "bg-amber-100 ring-1 ring-amber-600"
                          : "hover:bg-amber-50"
                      }`}
                    >
                      <div
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl text-xs font-bold text-amber-50 ${customer.tone}`}
                      >
                        {customer.initials}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold">
                          {customer.name}
                        </p>
                        <p className="truncate text-xs text-stone-500">
                          {customer.email}
                        </p>
                      </div>
                      <span className="text-[11px] font-bold text-amber-600">
                        {customer.points.toLocaleString()} pts
                      </span>
                    </button>
                  ))}
                  {!filteredCustomers.length && (
                    <p className="p-4 text-center text-sm text-stone-500">
                      No customers found.
                    </p>
                  )}
                </div>
              </aside>

              <section className="min-w-0 rounded-2xl border border-amber-100 bg-white/70 p-3 sm:p-6 lg:p-8">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <div
                      className={`grid h-20 w-20 place-items-center rounded-2xl text-xl font-bold text-amber-50 ring-4 ring-white shadow-sm ${selected.tone}`}
                    >
                      {selected.initials}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold sm:text-3xl">
                        {selected.name}
                      </h2>
                      <p className="mt-1 text-sm text-stone-500">
                        Customer ID: #{selected.id}
                      </p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[11px] font-bold text-amber-600">
                          VIP Customer
                        </span>
                        <span className="rounded-full bg-black px-2.5 py-1 text-[11px] font-bold text-amber-50">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNotice("Edit profile action selected.")}
                    className="h-11 rounded-xl border border-amber-200 bg-white px-5 text-sm font-bold transition hover:bg-amber-100"
                  >
                    Edit profile
                  </button>
                </div>
                {notice && (
                  <p
                    className="mt-4 text-sm font-semibold text-amber-600"
                    aria-live="polite"
                  >
                    {notice}
                  </p>
                )}

                <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  <StatCard
                    icon={<LuStickyNote />}
                    label="Loyalty points"
                    value={selected.points.toLocaleString()}
                    detail="+240 pts this month"
                  />
                  <StatCard
                    icon={<LuUserRound />}
                    label="Total spent"
                    value={money(selected.spent)}
                    detail={`${selected.orders} total orders`}
                  />
                  <StatCard
                    icon={<LuCalendarDays />}
                    label="Last purchase"
                    value={selected.lastPurchase}
                    detail={`Order #${selected.id}`}
                  />
                </div>
                <div className="mt-5 grid gap-5 2xl:grid-cols-[minmax(260px,.7fr)_minmax(0,1.6fr)]">
                  <section className="rounded-2xl border border-amber-100 bg-white/60 p-5">
                    <h3 className="font-bold">Contact details</h3>
                    <div className="mt-5 grid gap-5">
                      <Detail
                        icon={<LuPhone />}
                        label="Phone"
                        value={selected.phone}
                      />
                      <Detail
                        icon={<LuMail />}
                        label="Email"
                        value={selected.email}
                      />
                      <Detail
                        icon={<LuCalendarDays />}
                        label="Join date"
                        value={selected.joined}
                      />
                    </div>
                    <button
                      type="button"
                      className="mt-7 flex h-10 w-full items-center justify-center gap-1 rounded-xl bg-amber-100 text-sm font-bold transition hover:bg-amber-200"
                    >
                      View all notes <LuChevronRight className="h-4 w-4" />
                    </button>
                  </section>
                  <section className="overflow-hidden rounded-2xl border border-amber-100 bg-white/60">
                    <div className="flex items-center justify-between p-5">
                      <h3 className="font-bold">Purchase history</h3>
                      <button
                        type="button"
                        className="text-sm font-bold text-amber-600 hover:underline"
                      >
                        View all
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[600px] text-left text-sm">
                        <thead className="border-y border-amber-100 bg-amber-50 text-[10px] uppercase tracking-wide text-stone-400">
                          <tr>
                            <th className="px-5 py-4">Order ID</th>
                            <th className="px-5 py-4">Date</th>
                            <th className="px-5 py-4">Items</th>
                            <th className="px-5 py-4">Total</th>
                            <th className="px-5 py-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orders.map(([id, date, items, total, status]) => (
                            <tr
                              key={id}
                              className="border-b border-amber-50 last:border-0"
                            >
                              <td className="px-5 py-4 font-bold">#{id}</td>
                              <td className="px-5 py-4 text-stone-500">
                                {date}
                              </td>
                              <td className="px-5 py-4 text-stone-500">
                                {items}
                              </td>
                              <td className="px-5 py-4 font-bold">{total}</td>
                              <td className="px-5 py-4">
                                <span
                                  className={`rounded-full px-2 py-1 text-[10px] font-bold ${
                                    status === "Completed"
                                      ? "bg-amber-100 text-amber-600"
                                      : "bg-black text-amber-50"
                                  }`}
                                >
                                  {status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </section>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  detail,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <section className="rounded-2xl border border-amber-100 bg-white/60 p-4 sm:p-5">
      <div className="flex items-center gap-3 text-stone-500">
        <span className="grid h-8 w-8 place-items-center rounded-xl bg-amber-100 text-amber-600">
          {icon}
        </span>
        <span className="text-xs font-bold">{label}</span>
      </div>
      <p className="mt-4 text-2xl font-bold">{value}</p>
      <p className="mt-1 text-[11px] font-semibold text-amber-600">{detail}</p>
    </section>
  );
}

function Detail({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-amber-100 text-amber-600">
        {icon}
      </span>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wide text-stone-400">
          {label}
        </p>
        <p className="text-sm font-bold">{value}</p>
      </div>
    </div>
  );
}
