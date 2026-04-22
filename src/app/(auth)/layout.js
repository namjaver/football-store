import Link from "next/link";
import { ToastContainer } from "@/components/ui/Toast";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#070709] flex flex-col">
      <header className="border-b border-[#1e1e26] px-4 h-14 flex items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 bg-[#00e676] rounded-lg flex items-center justify-center text-sm">⚽</div>
          <span className="font-bold text-white text-sm">Football<span className="text-[#00e676]">Store</span></span>
        </Link>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        {children}
      </main>
      <ToastContainer />
    </div>
  );
}
