"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    showToast("Đăng nhập thành công!", "success");
    setTimeout(() => router.push("/"), 500);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-white">Đăng nhập</h1>
        <p className="text-[#6b6b80] text-sm mt-1">Chào mừng bạn quay lại</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs text-[#6b6b80] block mb-1.5">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676] transition-colors"
            placeholder="email@example.com"
          />
        </div>
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs text-[#6b6b80]">Mật khẩu</label>
            <Link href="#" className="text-xs text-[#448aff] hover:underline">Quên mật khẩu?</Link>
          </div>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676] transition-colors"
            placeholder="••••••••"
          />
        </div>

        <Button type="submit" loading={loading} size="lg" className="w-full">
          Đăng nhập
        </Button>

        <div className="relative flex items-center gap-3">
          <div className="flex-1 h-px bg-[#1e1e26]" />
          <span className="text-xs text-[#6b6b80]">hoặc</span>
          <div className="flex-1 h-px bg-[#1e1e26]" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 bg-[#0f0f12] border border-[#1e1e26] rounded-xl text-sm text-[#eaeaf0] hover:border-[#2e2e3a] transition-all"
        >
          <span>🌐</span> Tiếp tục với Google
        </button>
      </form>

      <p className="text-center text-sm text-[#6b6b80] mt-5">
        Chưa có tài khoản?{" "}
        <Link href="/register" className="text-[#00e676] hover:underline font-medium">
          Đăng ký ngay
        </Link>
      </p>
    </div>
  );
}
