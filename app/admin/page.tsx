import { prisma } from "@/lib/prisma";

export default async function AdminHomePage() {
  const [ordersCount, itemsCount] = await Promise.all([
    prisma.order.count(),
    prisma.item.count(),
  ]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Overview</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-white border rounded-xl p-4 text-sm">
          <p className="text-xs text-slate-500">Total Orders</p>
          <p className="text-2xl font-semibold mt-1">{ordersCount}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-sm">
          <p className="text-xs text-slate-500">Menu Items</p>
          <p className="text-2xl font-semibold mt-1">{itemsCount}</p>
        </div>
        <div className="bg-white border rounded-xl p-4 text-sm">
          <p className="text-xs text-slate-500">Status</p>
          <p className="text-sm mt-1">System online</p>
        </div>
      </div>
    </div>
  );
}
