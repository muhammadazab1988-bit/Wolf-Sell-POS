import { useMemo, useState } from "react";

export type CartItem = {
  id: string;
  name: string;
  category: string;
  size: string;
  price: number;
  quantity: number;
  image: "tee" | "jeans" | "sneakers" | "top" | "jacket";
};

type ClothingCartProps = {
  initialItems?: CartItem[];
  onCheckout?: (items: CartItem[], total: number) => void;
};
const sellerName = "Muhammed Azab";

const defaultItems: CartItem[] = [
  { id: "tee", name: "Classic Cotton Tee", category: "Men's T-shirts", size: "M", price: 14.99, quantity: 2, image: "tee" },
  { id: "jeans", name: "Slim Fit Blue Jeans", category: "Men's Jeans", size: "32", price: 39.99, quantity: 1, image: "jeans" },
  { id: "sneakers", name: "White Sneakers", category: "Men's Shoes", size: "UK 8", price: 49.99, quantity: 1, image: "sneakers" },
  { id: "top", name: "Ribbed Crop Top", category: "Women's Tops", size: "S", price: 12.99, quantity: 3, image: "top" },
  { id: "jacket", name: "Denim Jacket", category: "Men's Jackets", size: "L", price: 59.99, quantity: 1, image: "jacket" },
];

const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);

function BagIcon() {
  return <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true"><path d="M5 8h14l-1 12H6L5 8Zm4 0a3 3 0 1 1 6 0" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function TrashIcon() {
  return <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true"><path d="M4 7h16M10 11v5m4-5v5M9 7l1-2h4l1 2m-9 0 1 13h10l1-13" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function CardIcon() {
  return <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="M3 10h18M7 15h3" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>;
}

function ProductArtwork({ type }: { type: CartItem["image"] }) {
  if (type === "tee") return <svg viewBox="0 0 56 64" className="h-full w-full" aria-hidden="true"><rect width="56" height="64" fill="#f1eee8"/><path d="M17 21l8-6h6l8 6 7 4-5 10-5-2v22H20V33l-5 2-5-10z" fill="#f8f8f5" stroke="#c9c7bf"/><path d="M25 15l3 5 3-5" fill="none" stroke="#b2b0ab"/></svg>;
  if (type === "jeans") return <svg viewBox="0 0 56 64" className="h-full w-full" aria-hidden="true"><rect width="56" height="64" fill="#e9e8e2"/><path d="M16 10h24l-3 44H19z" fill="#1e293b"/><path d="M20 10l8 7 8-7" fill="#31425a"/><path d="M25 17v36m6-36v36" stroke="#5c6d82" strokeWidth="1"/></svg>;
  if (type === "sneakers") return <svg viewBox="0 0 56 64" className="h-full w-full" aria-hidden="true"><rect width="56" height="64" fill="#f4eadc"/><path d="M8 35c10-3 19-15 29-13l11 8-7 7-17 2-8 7-8-2z" fill="#faf9f6" stroke="#c7bfb4"/><path d="M16 40l16 1" stroke="#d5ccc0" strokeWidth="2"/></svg>;
  if (type === "top") return <svg viewBox="0 0 56 64" className="h-full w-full" aria-hidden="true"><rect width="56" height="64" fill="#f1d2ba"/><circle cx="28" cy="19" r="9" fill="#9d654c"/><path d="M14 59c1-16 7-25 14-25s13 9 14 25" fill="#c85f40"/></svg>;
  return <svg viewBox="0 0 56 64" className="h-full w-full" aria-hidden="true"><rect width="56" height="64" fill="#e9e7e1"/><path d="M16 17l9-6h6l9 6 5 13-7 3-3-7v29H21V26l-3 7-7-3z" fill="#26384d"/><path d="M21 20h14v35H21z" fill="#30475e"/><path d="M28 21v34" stroke="#718195"/></svg>;
}

export default function ClothingCart({ initialItems = defaultItems, onCheckout }: ClothingCartProps) {
  const [items, setItems] = useState<CartItem[]>(initialItems);
  const [message, setMessage] = useState("");
  const totals = useMemo(() => {
    const bill = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const discount = bill * 0.1;
    const vat = (bill - discount) * 0.05;
    return { bill, discount, vat, handling: items.length ? 2 : 0, total: bill - discount + vat + (items.length ? 2 : 0) };
  }, [items]);

  const changeQuantity = (id: string, amount: number) => {
    setItems(current => current.flatMap(item => item.id !== id ? [item] : item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : []));
    setMessage("");
  };

  const completePurchase = () => {
    if (!items.length) return setMessage("Add an item before checking out.");
    onCheckout?.(items, totals.total);
    setMessage("Order ready for payment.");
  };

  return (
    <section className="mx-auto w-full max-w-[480px] rounded-[24px] bg-amber-50 p-4 text-stone-950 sm:p-5" aria-label="Shopping cart">
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="w-full bg-amber-600 text-shadow-black text-xl rounded-2xl flex justify-center">Saller : {sellerName}</div>
        <div className="flex items-center gap-2.5"><span className="grid h-[37px] w-[37px] place-items-center rounded-xl bg-white text-orange-700 shadow-[0_5px_15px_rgba(75,36,11,0.08)]"><BagIcon /></span><h2 className="text-[22px] font-semibold tracking-[-0.04em]">Cart</h2></div>
        <button className="grid h-[37px] w-[37px] place-items-center rounded-xl bg-orange-100 text-orange-800 transition hover:bg-orange-200" type="button" onClick={() => { setItems([]); setMessage("Cart cleared."); }} aria-label="Clear cart"><TrashIcon /></button>
      </header>

      {items.length ? <div className="grid gap-3.5">
        {items.map(item => <article className="flex flex-col gap-3 rounded-[16px] bg-white/70 p-3 sm:grid sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:items-center" key={item.id}>
          <div className="flex items-center gap-3">
            <div className="h-16 w-14 shrink-0 overflow-hidden rounded-[14px] bg-orange-100"><ProductArtwork type={item.image} /></div>
            <div className="min-w-0"><strong className="block truncate text-[13px] font-semibold">{item.name}</strong><small className="mt-0.5 block text-[11px] text-stone-500">{item.category} · {item.size}</small></div>
          </div>
          <div className="flex items-center justify-between gap-3 sm:justify-end"><strong className="text-[13px] font-semibold">{formatMoney(item.price)}</strong><div className="flex items-center overflow-hidden rounded-full border border-orange-100 bg-white"><button className="h-7 w-7 text-[17px] text-orange-700" type="button" onClick={() => changeQuantity(item.id, -1)} aria-label={`Remove one ${item.name}`}>−</button><span className="w-6 text-center text-xs font-semibold">{item.quantity}</span><button className="h-7 w-7 text-[17px] text-orange-700" type="button" onClick={() => changeQuantity(item.id, 1)} aria-label={`Add one ${item.name}`}>+</button></div></div>
        </article>)}
      </div> : <p className="py-10 text-center text-sm text-stone-500">Your cart is ready for something new.</p>}

      {items.length > 0 && <section className="mt-7 grid gap-1 rounded-[18px] bg-stone-950 p-4 text-xs text-orange-100" aria-label="Order summary">
        <div className="flex justify-between py-1"><span>Bill</span><strong className="font-semibold text-amber-50">{formatMoney(totals.bill)}</strong></div><div className="flex justify-between py-1"><span>Discount (10%)</span><strong className="font-semibold text-amber-50">−{formatMoney(totals.discount)}</strong></div><div className="flex justify-between py-1"><span>VAT (5%)</span><strong className="font-semibold text-amber-50">{formatMoney(totals.vat)}</strong></div><div className="flex justify-between py-1"><span>Handling charges</span><strong className="font-semibold text-amber-50">{formatMoney(totals.handling)}</strong></div><div className="mt-2 flex justify-between border-t border-white/20 pt-3 text-sm text-amber-50"><span>Grand total</span><strong className="text-[17px] font-semibold text-orange-300">{formatMoney(totals.total)}</strong></div>
      </section>}

      <button className="mt-4 flex min-h-[54px] w-full items-center justify-center gap-2.5 rounded-2xl bg-amber-700 text-sm font-semibold text-amber-50 shadow-[0_10px_20px_rgba(194,65,12,0.24)] transition hover:bg-orange-800" type="button" onClick={completePurchase}><CardIcon />Complete purchase</button>
      <p className="m-0 mt-3 min-h-[19px] text-center text-xs text-orange-800" aria-live="polite">{message}</p>
    </section>
  );
}