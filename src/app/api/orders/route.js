import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { items, shippingAddress, paymentMethod } = body;

  if (!items?.length || !shippingAddress || !paymentMethod) {
    return NextResponse.json({ error: "Thiếu thông tin đơn hàng" }, { status: 400 });
  }

  const total = items.reduce((sum, item) => {
    const price = item.product.salePrice ?? item.product.price;
    return sum + price * item.quantity;
  }, 0);

  const orderId = "FS" + Date.now().toString(36).toUpperCase();

  // In production: save to DB, trigger payment, send email
  return NextResponse.json({
    message: "Đặt hàng thành công",
    order: {
      id: orderId,
      status: "pending",
      total,
      paymentMethod,
      shippingAddress,
      createdAt: new Date().toISOString(),
    },
  });
}

export async function GET(request) {
  // In production: fetch from DB with auth check
  return NextResponse.json({
    data: [],
    meta: { total: 0, page: 1, limit: 10, totalPages: 0 },
  });
}
