"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartStore } from "@/store/cartStore";

const tabs = [
  { href: "/", icon: "🏠", label: "Trang chủ" },
  { href: "/products", icon: "⚽", label: "Sản phẩm" },
  { href: "/cart", icon: "🛒", label: "Giỏ hàng" },
  { href: "/login", icon: "👤", label: "Tài khoản" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const count = useCartStore((s) => s.items.reduce((sum, i) => sum + i.quantity, 0));

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0f0f12]/95 backdrop-blur-md border-t border-[#1e1e26]">
      <div className="flex items-stretch h-16">
        {tabs.map((tab) => {
          const active = pathname === tab.href || (tab.href !== "/" && pathname.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 transition-colors relative ${
                active ? "text-[#00e676]" : "text-[#6b6b80]"
              }`}
            >
              <span className="text-lg relative">
                {tab.icon}
                {tab.href === "/cart" && count > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#00e676] text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                    {count > 9 ? "9+" : count}
                  </span>
                )}
              </span>
              <span className="text-[10px] font-medium">{tab.label}</span>
              {active && (
                <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-[#00e676] rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
