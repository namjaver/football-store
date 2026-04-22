"use client";
import { useState } from "react";
import { formatPrice } from "@/lib/data";
import { showToast } from "@/components/ui/Toast";

const mockOrders = [
  { id: "#FS001", customer: "Nguyễn Văn A", phone: "0901234567", items: 2, total: 4500000, status: "paid", payment: "vnpay", date: "22/04/2024 09:15" },
  { id: "#FS002", customer: "Trần Thị B", phone: "0912345678", items: 1, total: 1200000, status: "shipping", payment: "cod", date: "22/04/2024 10:30" },
  { id: "#FS003", customer: "Lê Văn C", phone: "0923456789", items: 3, total: 3800000, status: "pending", payment: "momo", date: "21/04/2024 14:20" },
  { id: "#FS004", customer: "Phạm Thị D", phone: "0934567890", items: 1, total: 950000, status: "done", payment: "cod", date: "21/04/2024 16:00" },
  { id: "#FS005", customer: "Hoàng Văn E", phone: "0945678901", items: 2, total: 5200000, status: "cancelled", payment: "vnpay", date: "20/04/2024 11:45" },
];

const statusConfig = {
  pending: { label: "Chờ xác nhận", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
  paid: { label: "Đã thanh toán", color: "text-[#448aff] bg-[#448aff]/10 border-[#448aff]/20" },
  shipping: { label: "Đang giao", color: "text-[#ff6d00] bg-[#ff6d00]/10 border-[#ff6d00]/20" },
  done: { label: "Hoàn thành", color: "text-[#00e676] bg-[#00e676]/10 border-[#00e676]/20" },
  cancelled: { label: "Đã hủy", color: "text-[#ff1744] bg-[#ff1744]/10 border-[#ff1744]/20" },
};

const statusFlow = ["pending", "paid", "shipping", "done"];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState(mockOrders);
  const [filterStatus, setFilterStatus] = useState("");

  const filtered = filterStatus ? orders.filter((o) => o.status === filterStatus) : orders;

  const updateStatus = (id, newStatus) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
    showToast(`Đã cập nhật trạng thái đơn hàng ${id}`, "success");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Đơn hàng</h1>
          <p className="text-sm text-[#6b6b80] mt-0.5">{orders.length} đơn hàng</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {[{ label: "Tất cả", value: "" }, ...Object.entries(statusConfig).map(([k, v]) => ({ label: v.label, value: k }))].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilterStatus(tab.value)}
            className={`px-3 py-1.5 text-xs rounded-xl border transition-all ${
              filterStatus === tab.value
                ? "bg-[#00e67618] text-[#00e676] border-[#00e67630]"
                : "text-[#6b6b80] border-[#1e1e26] hover:border-[#2e2e3a] hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#141418] border border-[#1e1e26] rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1e1e26]">
                {["Mã đơn", "Khách hàng", "Số lượng", "Tổng tiền", "Thanh toán", "Trạng thái", "Ngày", "Thao tác"].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs text-[#6b6b80] font-semibold uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e26]">
              {filtered.map((order) => {
                const cfg = statusConfig[order.status];
                const currentIdx = statusFlow.indexOf(order.status);
                const nextStatus = statusFlow[currentIdx + 1];

                return (
                  <tr key={order.id} className="hover:bg-[#1e1e26]/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-[#00e676]">{order.id}</td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-white">{order.customer}</p>
                      <p className="text-xs text-[#6b6b80]">{order.phone}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#6b6b80]">{order.items} sản phẩm</td>
                    <td className="px-4 py-3 text-sm font-semibold text-white">{formatPrice(order.total)}</td>
                    <td className="px-4 py-3 text-sm text-[#6b6b80] uppercase">{order.payment}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cfg.color}`}>
                        {cfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#6b6b80] whitespace-nowrap">{order.date}</td>
                    <td className="px-4 py-3">
                      {nextStatus && (
                        <button
                          onClick={() => updateStatus(order.id, nextStatus)}
                          className="text-xs text-[#448aff] hover:underline whitespace-nowrap"
                        >
                          → {statusConfig[nextStatus].label}
                        </button>
                      )}
                      {order.status !== "cancelled" && order.status !== "done" && (
                        <button
                          onClick={() => updateStatus(order.id, "cancelled")}
                          className="block text-xs text-[#ff1744] hover:underline mt-1"
                        >
                          Hủy đơn
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
