import data from "@/data/users.json";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const accounts = data.users || [];

    const user = accounts.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return Response.json({
        success: true,
        message: "Đăng nhập thành công",
        user: { username: user.username },
      });
    } else {
      return Response.json({
        success: false,
        message: "Sai tên đăng nhập hoặc mật khẩu",
      });
    }
  } catch (error) {
    console.error("Login error:", error);
    return Response.json(
      { success: false, message: "Lỗi hệ thống đăng nhập" },
      { status: 500 }
    );
  }
}
