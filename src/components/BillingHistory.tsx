import Image from "next/image";

type Bill = {
  id: string;
  name: string;
  orderNumber: string;
  image: string;
  totalItems: number;
  totalAmount: string;
  active?: boolean;
};

const bills: Bill[] = [
  {
    id: "1",
    name: "Emma Wilson",
    orderNumber: "#1023",
    image: "https://i.pravatar.cc/100?img=47",
    totalItems: 9,
    totalAmount: "$288.82",
    active: true,
  },
  {
    id: "2",
    name: "Liam Johnson",
    orderNumber: "#1024",
    image: "https://i.pravatar.cc/100?img=12",
    totalItems: 15,
    totalAmount: "$505.00",
  },
  {
    id: "3",
    name: "Liam Johnson",
    orderNumber: "#1025",
    image: "https://i.pravatar.cc/100?img=12",
    totalItems: 15,
    totalAmount: "$505.00",
  },
];

export default function BillingHistory() {
  return (
    <section className="rounded-2xl bg-amber-50 p-4 shadow sm:p-5">
      <div className="mb-5 flex flex-col gap-3 rounded-2xl sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-base-200 p-3 text-xl">🧾</div>
          <h2 className="text-xl font-bold text-black">Billing History</h2>
        </div>

        <select className="select select-sm w-full rounded-xl border-base-200 sm:w-auto">
          <option>Today</option>
          <option>This week</option>
          <option>This month</option>
        </select>
      </div>

      <div className="space-y-3">
        {bills.map((bill) => (
          <button
            key={bill.id}
            className={`flex flex-col gap-3 rounded-2xl border p-3 text-left transition sm:flex-row sm:items-center sm:gap-4 ${
              bill.active
                ? "bg-amber-600 text-black"
                : "border-base-200 bg-amber-50 hover:bg-base-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <Image
                src={bill.image}
                alt={bill.name}
                width={44}
                height={44}
                className="h-11 w-11 rounded-xl object-cover"
              />

              <div className="min-w-0">
                <p className="font-bold">{bill.name}</p>
                <p
                  className={`text-sm ${bill.active ? "text-white/80" : "text-black"}`}
                >
                  {bill.orderNumber}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 sm:ml-auto sm:justify-end">
              <div className="min-w-[5rem]">
                <p
                  className={`text-xs ${bill.active ? "text-white/80" : "text-black"}`}
                >
                  Total Items
                </p>
                <p className="font-bold">{bill.totalItems}</p>
              </div>

              <div className="min-w-[7rem]">
                <p
                  className={`text-xs ${bill.active ? "text-white/80" : "text-black"}`}
                >
                  Total Amount
                </p>
                <p className="font-bold">{bill.totalAmount}</p>
              </div>
            </div>

            <span
              className={`grid h-9 w-9 place-items-center rounded-full text-lg ${
                bill.active ? "bg-white/20" : "bg-base-200"
              }`}
            >
              ⌄
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
