import Link from "next/link";
import Button from "@/components/ui/Button";

export default function OrderSuccessPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-20 text-center">
      <div className="w-20 h-20 bg-[#00e67618] border border-[#00e67630] rounded-full flex items-center justify-center text-4xl mx-auto mb-6">
        ✓
      </div>
      <h1 className="text-2xl font-black text-white mb-3">Đặt hàng thành công!</h1>
      <p className="text-[#6b6b80] mb-2">Cảm ơn bạn đã mua hàng tại Football Store.</p>
      <p className="text-[#6b6b80] text-sm mb-8">
        Chúng tôi sẽ gửi email xác nhận và liên hệ với bạn trong vòng 1-2 giờ.
      </p>

      <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-5 mb-8 text-left space-y-3">
        {[
          ["Mã đơn hàng", "#FS" + Math.random().toString(36).slice(2, 8).toUpperCase()],
          ["Trạng thái", "Chờ xác nhận"],
          ["Phương thức thanh toán", "COD"],
          ["Thời gian giao hàng dự kiến", "2-3 ngày làm việc"],
        ].map(([k, v]) => (
          <div key={k} className="flex justify-between text-sm">
            <span className="text-[#6b6b80]">{k}</span>
            <span className="text-white font-medium">{v}</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 justify-center">
        <Link href="/products">
          <Button variant="outline">Tiếp tục mua sắm</Button>
        </Link>
        <Link href="/">
          <Button>Về trang chủ</Button>
        </Link>
      </div>
    </div>
  );
}
