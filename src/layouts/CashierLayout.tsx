export default function CashierLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col bg-amber-50 md:flex-row">
      <aside className="w-full bg-amber-600 p-4 text-white md:w-64 md:p-6">
        <h1 className="text-lg font-semibold">Cashier Panel</h1>
        <p className="mt-2 text-sm text-amber-100">Responsive sidebar</p>
      </aside>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
