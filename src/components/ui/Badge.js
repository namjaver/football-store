const config = {
  sale: { label: "SALE", color: "bg-[#ff174422] text-[#ff1744] border-[#ff174430]" },
  new: { label: "MỚI", color: "bg-[#00e67622] text-[#00e676] border-[#00e67630]" },
  hot: { label: "HOT", color: "bg-[#ff6d0022] text-[#ff6d00] border-[#ff6d0030]" },
  "hết hàng": { label: "HẾT HÀNG", color: "bg-[#6b6b8022] text-[#6b6b80] border-[#6b6b8030]" },
};

export default function Badge({ type }) {
  const cfg = config[type?.toLowerCase()];
  if (!cfg) return null;
  return (
    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${cfg.color} tracking-wider`}>
      {cfg.label}
    </span>
  );
}
