import { prisma } from "@/lib/prisma";

export default async function AdminOrdersPage() {
  const orders = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 50,
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Recent Orders</h2>
      {orders.length === 0 ? (
        <p className="text-sm text-slate-600">No orders yet.</p>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl p-3 text-sm space-y-1"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {order.name} • {order.type.toUpperCase()}
                </p>
                <p className="text-xs text-slate-500">
                  {order.createdAt.toISOString()}
                </p>
              </div>
              <p className="text-xs text-slate-500">
                Phone: {order.phone} • Status: {order.status}
              </p>
              <ul className="text-xs list-disc ml-4 mt-1">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.quantity} × {item.name} (${item.price.toFixed(2)})
                  </li>
                ))}
              </ul>
              <p className="text-sm font-semibold mt-1">
                Total: ${order.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
