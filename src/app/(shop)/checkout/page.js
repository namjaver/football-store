"use client";
import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/data";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const paymentMethods = [
  { id: "vnpay", label: "VNPay", icon: "💳", desc: "Thanh toán qua VNPay" },
  { id: "momo", label: "MoMo", icon: "💜", desc: "Ví điện tử MoMo" },
  { id: "cod", label: "COD", icon: "💵", desc: "Trả tiền mặt khi nhận hàng" },
];

export default function CheckoutPage() {
  const { items, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [payment, setPayment] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: "", phone: "", email: "",
    province: "", district: "", address: "",
    note: "",
  });

  const subtotal = items.reduce((sum, i) => sum + (i.product.salePrice ?? i.product.price) * i.quantity, 0);
  const shipping = subtotal >= 500000 ? 0 : 35000;
  const total = subtotal + shipping;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-8">Thanh toán</h1>

      {/* Steps */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2].map((s) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
              step >= s ? "bg-[#00e676] text-black" : "bg-[#1e1e26] text-[#6b6b80]"
            }`}>
              {step > s ? "✓" : s}
            </div>
            <span className={`text-sm ${step >= s ? "text-white" : "text-[#6b6b80]"}`}>
              {s === 1 ? "Thông tin giao hàng" : "Thanh toán"}
            </span>
            {s < 2 && <span className="text-[#1e1e26] mx-2">──</span>}
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 space-y-6">
          {step === 1 && (
            <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-6 space-y-4">
              <h2 className="font-semibold text-white">Thông tin nhận hàng</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#6b6b80] block mb-1">Họ và tên *</label>
                  <input
                    required
                    value={form.fullName}
                    onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                    className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00e676]"
                    placeholder="Nguyễn Văn A"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#6b6b80] block mb-1">Số điện thoại *</label>
                  <input
                    required
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00e676]"
                    placeholder="0901234567"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#6b6b80] block mb-1">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00e676]"
                  placeholder="email@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#6b6b80] block mb-1">Tỉnh/Thành phố *</label>
                  <select
                    required
                    value={form.province}
                    onChange={(e) => setForm({ ...form, province: e.target.value })}
                    className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00e676]"
                  >
                    <option value="">Chọn tỉnh/thành</option>
                    <option>TP. Hồ Chí Minh</option>
                    <option>Hà Nội</option>
                    <option>Đà Nẵng</option>
                    <option>Cần Thơ</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[#6b6b80] block mb-1">Quận/Huyện *</label>
                  <input
                    required
                    value={form.district}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00e676]"
                    placeholder="Quận 1"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs text-[#6b6b80] block mb-1">Địa chỉ chi tiết *</label>
                <input
                  required
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00e676]"
                  placeholder="Số nhà, tên đường..."
                />
              </div>
              <div>
                <label className="text-xs text-[#6b6b80] block mb-1">Ghi chú</label>
                <textarea
                  rows={2}
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  className="w-full bg-[#0f0f12] border border-[#1e1e26] rounded-xl px-3 py-2.5 text-sm text-white outline-none focus:border-[#00e676] resize-none"
                  placeholder="Ghi chú cho đơn hàng..."
                />
              </div>
              <Button
                type="button"
                size="lg"
                className="w-full"
                onClick={() => {
                  if (form.fullName && form.phone && form.province && form.district && form.address) {
                    setStep(2);
                  }
                }}
              >
                Tiếp tục →
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-white">Phương thức thanh toán</h2>
                <button type="button" onClick={() => setStep(1)} className="text-xs text-[#00e676] hover:underline">
                  Sửa thông tin
                </button>
              </div>
              <div className="space-y-3">
                {paymentMethods.map((m) => (
                  <label
                    key={m.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                      payment === m.id ? "border-[#00e676] bg-[#00e67610]" : "border-[#1e1e26] hover:border-[#2e2e3a]"
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={m.id}
                      checked={payment === m.id}
                      onChange={() => setPayment(m.id)}
                      className="hidden"
                    />
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      payment === m.id ? "border-[#00e676]" : "border-[#2e2e3a]"
                    }`}>
                      {payment === m.id && <div className="w-2.5 h-2.5 rounded-full bg-[#00e676]" />}
                    </div>
                    <span className="text-2xl">{m.icon}</span>
                    <div>
                      <p className="text-sm font-semibold text-white">{m.label}</p>
                      <p className="text-xs text-[#6b6b80]">{m.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <Button type="submit" size="lg" className="w-full" loading={loading}>
                {loading ? "Đang xử lý..." : `Đặt hàng · ${formatPrice(total)}`}
              </Button>
              <p className="text-xs text-[#6b6b80] text-center">
                Bằng cách đặt hàng, bạn đồng ý với điều khoản sử dụng của chúng tôi
              </p>
            </div>
          )}
        </form>

        {/* Order summary */}
        <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-5 h-fit sticky top-24 space-y-4">
          <h3 className="font-semibold text-white text-sm">Đơn hàng ({items.length} sản phẩm)</h3>
          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.key} className="flex gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[#1e1e26] flex-shrink-0">
                  <Image src={item.product.images[0]} alt="" fill className="object-cover" sizes="48px" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#6b6b80] text-[9px] text-white rounded-full flex items-center justify-center font-bold">
                    {item.quantity}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-white font-medium truncate">{item.product.name}</p>
                  <p className="text-xs text-[#6b6b80]">Size {item.size}</p>
                </div>
                <p className="text-xs text-white font-semibold">
                  {formatPrice((item.product.salePrice ?? item.product.price) * item.quantity)}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-[#1e1e26] pt-3 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#6b6b80]">Tạm tính</span>
              <span className="text-white">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-[#6b6b80]">Phí ship</span>
              <span className={shipping === 0 ? "text-[#00e676]" : "text-white"}>
                {shipping === 0 ? "Miễn phí" : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between font-bold text-sm pt-1">
              <span className="text-white">Tổng</span>
              <span className="text-[#00e676]">{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
