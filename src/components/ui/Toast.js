"use client";
import { useEffect, useState } from "react";

let toastFn;
export function showToast(message, type = "success") {
  toastFn?.({ message, type, id: Date.now() });
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    toastFn = (toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
  }, []);

  const icons = { success: "✓", error: "✕", info: "ℹ" };
  const colors = {
    success: "border-[#00e676] bg-[#00e67612] text-[#00e676]",
    error: "border-[#ff1744] bg-[#ff174412] text-[#ff1744]",
    info: "border-[#448aff] bg-[#448aff12] text-[#448aff]",
  };

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-sm shadow-lg animate-in slide-in-from-right-4 ${colors[t.type]}`}
        >
          <span className="font-bold text-sm">{icons[t.type]}</span>
          <span className="text-[#eaeaf0] text-sm">{t.message}</span>
        </div>
      ))}
    </div>
  );
}
