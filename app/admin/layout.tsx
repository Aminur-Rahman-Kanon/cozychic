import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  if (!session || (session.user as any)?.role !== "ADMIN") {
    redirect("/auth/signin");
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
        <p className="text-xs text-slate-500">
          Signed in as {session.user?.email} (ADMIN)
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-[200px,1fr]">
        <nav className="bg-white border rounded-xl p-3 text-sm space-y-1">
          <a href="/admin" className="block hover:underline">
            Overview
          </a>
          <a href="/admin/menu" className="block hover:underline">
            Menu
          </a>
          <a href="/admin/orders" className="block hover:underline">
            Orders
          </a>
          <a href="/admin/offers" className="block hover:underline">
            Offers
          </a>
          <a href="/admin/settings" className="block hover:underline">
            Settings
          </a>
        </nav>
        <section>{children}</section>
      </div>
    </div>
  );
}
