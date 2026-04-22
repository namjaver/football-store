"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ToastContainer } from "@/components/ui/Toast";

const navItems = [
  { href: "/admin", icon: "📊", label: "Dashboard" },
  { href: "/admin/products", icon: "⚽", label: "Sản phẩm" },
  { href: "/admin/orders", icon: "📦", label: "Đơn hàng" },
  { href: "/admin/customers", icon: "👥", label: "Khách hàng" },
];

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#070709] flex">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 border-r border-[#1e1e26] bg-[#0f0f12] flex flex-col">
        <div className="p-4 border-b border-[#1e1e26]">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#00e676] rounded-lg flex items-center justify-center text-sm">⚽</div>
            <div>
              <p className="text-xs font-bold text-white">FootballStore</p>
              <p className="text-[10px] text-[#6b6b80]">Admin Panel</p>
            </div>
          </Link>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all ${
                  active
                    ? "bg-[#00e67618] text-[#00e676] font-semibold border border-[#00e67630]"
                    : "text-[#6b6b80] hover:text-white hover:bg-[#1e1e26]"
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
        <div className="p-3 border-t border-[#1e1e26]">
          <Link
            href="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#6b6b80] hover:text-white hover:bg-[#1e1e26] transition-all"
          >
            <span>🌐</span>
            <span>Xem website</span>
          </Link>
        </div>
      </aside>

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b border-[#1e1e26] px-6 flex items-center justify-between bg-[#0f0f12]/50">
          <h1 className="font-semibold text-white text-sm">
            {navItems.find((i) => i.href === pathname)?.label || "Admin"}
          </h1>
          <div className="flex items-center gap-3 text-sm text-[#6b6b80]">
            <span>👤 Admin</span>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
      <ToastContainer />
    </div>
  );
}
