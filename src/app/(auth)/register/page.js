"use client";
import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) {
      showToast("Mật khẩu không khớp", "error");
      return;
    }
    if (!agreed) {
      showToast("Vui lòng đồng ý điều khoản", "error");
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    showToast("Đăng ký thành công! Chào mừng bạn 🎉", "success");
    setTimeout(() => router.push("/"), 800);
  };

  return (
    <div className="w-full max-w-sm">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-black text-white">Tạo tài khoản</h1>
        <p className="text-[#6b6b80] text-sm mt-1">Nhận ngay mã giảm giá 10% khi đăng ký</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-6 space-y-4">
        <div>
          <label className="text-xs text-[#6b6b80] block mb-1.5">Họ và tên</label>
          <input
            required
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676] transition-colors"
            placeholder="Nguyễn Văn A"
          />
        </div>
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
          <label className="text-xs text-[#6b6b80] block mb-1.5">Số điện thoại</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676] transition-colors"
            placeholder="0901234567"
          />
        </div>
        <div>
          <label className="text-xs text-[#6b6b80] block mb-1.5">Mật khẩu</label>
          <input
            type="password"
            required
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676] transition-colors"
            placeholder="Tối thiểu 8 ký tự"
          />
        </div>
        <div>
          <label className="text-xs text-[#6b6b80] block mb-1.5">Xác nhận mật khẩu</label>
          <input
            type="password"
            required
            value={form.confirm}
            onChange={(e) => setForm({ ...form, confirm: e.target.value })}
            className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white placeholder-[#6b6b80] outline-none focus:border-[#00e676] transition-colors"
            placeholder="••••••••"
          />
        </div>

        <label className="flex items-start gap-3 cursor-pointer">
          <div
            onClick={() => setAgreed(!agreed)}
            className={`w-5 h-5 rounded-md border-2 flex-shrink-0 flex items-center justify-center mt-0.5 transition-all cursor-pointer ${
              agreed ? "border-[#00e676] bg-[#00e676]" : "border-[#2e2e3a]"
            }`}
          >
            {agreed && <span className="text-black text-[10px] font-bold">✓</span>}
          </div>
          <span className="text-xs text-[#6b6b80]">
            Tôi đồng ý với{" "}
            <Link href="#" className="text-[#448aff] hover:underline">Điều khoản dịch vụ</Link>{" "}
            và{" "}
            <Link href="#" className="text-[#448aff] hover:underline">Chính sách bảo mật</Link>
          </span>
        </label>

        <Button type="submit" loading={loading} size="lg" className="w-full">
          Tạo tài khoản
        </Button>
      </form>

      <p className="text-center text-sm text-[#6b6b80] mt-5">
        Đã có tài khoản?{" "}
        <Link href="/login" className="text-[#00e676] hover:underline font-medium">
          Đăng nhập
        </Link>
      </p>
    </div>
  );
}
