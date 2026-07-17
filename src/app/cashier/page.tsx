"use client";

import { useState } from "react";


import CategoryFilter from "@/components/CategoryFilter";
import CardFilter from "@/components/CardFilter";
import BillingHistory from "@/components/BillingHistory";
import Sidebar from "@/components/Sidebar";
import ClothingCart, { type CartItem } from "@/components/ClothingCart";
import Header from "@/components/Header";
import { LuScanBarcode, LuCheck } from "react-icons/lu";

type Payment = {
  orderNumber: number;
  totalAmount: number;
};

function PaymentSuccessModal({ payment, onClose }: { payment: Payment | null; onClose: () => void }) {
  if (!payment) return null;

  const total = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(payment.totalAmount);

  const downloadReceipt = () => {
    const receipt = `CLOTHING POS\n\nPayment successful\nOrder: #${payment.orderNumber}\nTotal: ${total}\n\nThank you for shopping with us.`;
    const blob = new Blob([receipt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${payment.orderNumber}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/65 p-4 backdrop-blur-sm" role="presentation" onMouseDown={(event) => event.currentTarget === event.target && onClose()}>
      <section className="w-full max-w-[460px] rounded-[28px] bg-amber-50 px-6 py-8 text-black shadow-2xl sm:px-10 sm:py-9" role="dialog" aria-modal="true" aria-labelledby="payment-success-title">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-amber-100 text-amber-600 ring-8 ring-amber-50 shadow-[0_0_0_1px_rgba(217,119,6,0.08)]"><LuCheck className="h-10 w-10" strokeWidth={2.5} /></div>
        <div className="mt-7 text-center"><h2 id="payment-success-title" className="text-2xl font-bold tracking-tight sm:text-[28px]">Payment successful</h2><p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-stone-600">Your transaction has been processed and your receipt is ready.</p></div>
        <div className="mt-8 rounded-2xl border border-amber-100 bg-white/60 p-5"><div className="flex items-center justify-between border-b border-amber-100 pb-5 text-sm"><span className="text-stone-500">Order number</span><strong>#{payment.orderNumber}</strong></div><div className="flex items-center justify-between pt-5 text-sm"><span className="text-stone-500">Total amount</span><strong className="text-xl text-amber-600">{total}</strong></div></div>
        <div className="mt-8 grid gap-3"><button type="button" onClick={() => window.print()} className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-amber-600 text-sm font-bold text-black shadow-[0_10px_20px_rgba(217,119,6,0.22)] transition hover:bg-amber-500"><LuPrinter className="h-5 w-5" />Print receipt</button><button type="button" onClick={downloadReceipt} className="flex h-14 items-center justify-center gap-2 rounded-2xl border-2 border-amber-200 text-sm font-bold text-black transition hover:bg-amber-100"><LuDownload className="h-5 w-5" />Download receipt</button><button type="button" onClick={onClose} className="mt-1 text-sm font-semibold text-stone-600 underline-offset-4 hover:text-black hover:underline">Close</button></div>
      </section>
    </div>
  );
}

export default function Page() {
  const [payment, setPayment] = useState<Payment | null>(null);

  const handleCheckout = (_items: CartItem[], totalAmount: number) => {
    setPayment({ orderNumber: Math.floor(1000 + Math.random() * 9000), totalAmount });
  };

  return (
    <main className="flex font-kameron">
      <Sidebar />
      <div className="flex flex-col items-center gap-2 p-3 sm:p-4 lg:p-6">
        <div className="container w-full">
         <Header />
        </div>
        <div className="container flex h-auto w-full flex-col gap-3 rounded-2xl bg-amber-600 p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5"><h1 className="text-2xl font-extrabold text-black">Category</h1><div className="w-full sm:flex-1"><CategoryFilter /></div></div>
        <CardFilter />
        <footer className="container w-full rounded-2xl bg-amber-50"><BillingHistory /></footer>
      </div>
      <ClothingCart onCheckout={handleCheckout} />
      <PaymentSuccessModal payment={payment} onClose={() => setPayment(null)} />
    </main>
  );
}