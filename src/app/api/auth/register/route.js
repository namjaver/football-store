import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const { email, password, fullName, phone } = body;

  if (!email || !password || !fullName) {
    return NextResponse.json(
      { error: "Thiếu thông tin bắt buộc" },
      { status: 400 }
    );
  }

  if (password.length < 8) {
    return NextResponse.json(
      { error: "Mật khẩu phải có ít nhất 8 ký tự" },
      { status: 400 }
    );
  }

  // In production: hash password, save to DB, send verification email
  return NextResponse.json({
    message: "Đăng ký thành công",
    user: { email, fullName, phone, role: "customer" },
  });
}
