import { products } from "@/lib/data";
import { formatPrice } from "@/lib/data";

const mockOrders = [
  { id: "#FS001", customer: "Nguyễn Văn A", total: 4500000, status: "paid", date: "22/04/2024" },
  { id: "#FS002", customer: "Trần Thị B", total: 1200000, status: "shipping", date: "22/04/2024" },
  { id: "#FS003", customer: "Lê Văn C", total: 3800000, status: "pending", date: "21/04/2024" },
  { id: "#FS004", customer: "Phạm Thị D", total: 950000, status: "done", date: "21/04/2024" },
  { id: "#FS005", customer: "Hoàng Văn E", total: 5200000, status: "cancelled", date: "20/04/2024" },
];

const statusConfig = {
  pending: { label: "Chờ xác nhận", color: "text-yellow-400 bg-yellow-400/10" },
  paid: { label: "Đã thanh toán", color: "text-[#448aff] bg-[#448aff]/10" },
  shipping: { label: "Đang giao", color: "text-[#ff6d00] bg-[#ff6d00]/10" },
  done: { label: "Hoàn thành", color: "text-[#00e676] bg-[#00e676]/10" },
  cancelled: { label: "Đã hủy", color: "text-[#ff1744] bg-[#ff1744]/10" },
};

const stats = [
  { label: "Doanh thu tháng", value: formatPrice(125000000), change: "+12%", icon: "💰", color: "#00e676" },
  { label: "Đơn hàng", value: "234", change: "+8%", icon: "📦", color: "#448aff" },
  { label: "Sản phẩm", value: products.length.toString(), change: `${products.length} active`, icon: "⚽", color: "#ff6d00" },
  { label: "Khách hàng", value: "1,204", change: "+23 mới", icon: "👥", color: "#d500f9" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#141418] border border-[#1e1e26] rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-2xl">{s.icon}</span>
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: `${s.color}18`, color: s.color }}>
                {s.change}
              </span>
            </div>
            <p className="text-2xl font-black text-white">{s.value}</p>
            <p className="text-xs text-[#6b6b80] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-[#1e1e26] flex items-center justify-between">
          <h2 className="font-semibold text-white">Đơn hàng gần đây</h2>
          <a href="/admin/orders" className="text-xs text-[#00e676] hover:underline">Xem tất cả →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e26]">
                {["Mã đơn", "Khách hàng", "Tổng tiền", "Trạng thái", "Ngày"].map((h) => (
                  <th key={h} className="text-left px-5 py-3 text-xs text-[#6b6b80] font-semibold uppercase tracking-wider">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockOrders.map((order) => {
                const cfg = statusConfig[order.status];
                return (
                  <tr key={order.id} className="border-b border-[#1e1e26] hover:bg-[#1e1e26]/30 transition-colors">
                    <td className="px-5 py-3 text-sm font-mono text-[#00e676]">{order.id}</td>
                    <td className="px-5 py-3 text-sm text-white">{order.customer}</td>
                    <td className="px-5 py-3 text-sm font-semibold text-white">{formatPrice(order.total)}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-sm text-[#6b6b80]">{order.date}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top products */}
      <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-[#1e1e26]">
          <h2 className="font-semibold text-white">Sản phẩm bán chạy</h2>
        </div>
        <div className="divide-y divide-[#1e1e26]">
          {products.slice(0, 5).map((p, i) => (
            <div key={p.id} className="flex items-center gap-4 px-5 py-3">
              <span className="text-[#6b6b80] text-sm w-5 text-center">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white font-medium truncate">{p.name}</p>
                <p className="text-xs text-[#6b6b80]">{p.brand} · {p.reviews} đã bán</p>
              </div>
              <p className="text-sm font-semibold text-[#00e676]">{formatPrice(p.salePrice ?? p.price)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
