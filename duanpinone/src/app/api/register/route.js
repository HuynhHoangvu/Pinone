import fs from "fs";
import path from "path";
import data from "@/data/dangKy.json";

export async function POST(request) {
  try {
    const { username, password, email, phone, fullname } = await request.json();

    // 1️⃣ Kiểm tra dữ liệu đầu vào
    if (!username || !password || !email || !phone || !fullname) {
      return Response.json(
        { success: false, message: "Vui lòng nhập đầy đủ thông tin!" },
        { status: 400 }
      );
    }

    // 2️⃣ Đọc dữ liệu từ dangKy.json
    const registeredUsers = data.users || [];

    // 3️⃣ Kiểm tra tài khoản hoặc email trùng
    const existingUser = registeredUsers.find(
      (u) => u.username === username || u.email === email
    );
    if (existingUser) {
      return Response.json(
        { success: false, message: "Tài khoản hoặc email đã tồn tại!" },
        { status: 400 }
      );
    }

    // 4️⃣ Tạo người dùng mới
    const newUser = { username, password, email, phone, fullname };
    const updatedUsers = [...registeredUsers, newUser];

    // 5️⃣ Ghi lại file dangKy.json (đầy đủ thông tin)
    const dangKyPath = path.join(process.cwd(), "src/data/dangKy.json");
    fs.writeFileSync(
      dangKyPath,
      JSON.stringify({ users: updatedUsers }, null, 2),
      "utf-8"
    );

    // 6️⃣ Ghi thêm thông tin vào users.json (chỉ username và password)
    const usersPath = path.join(process.cwd(), "src/data/users.json");
    let usersData = { users: [] };

    if (fs.existsSync(usersPath)) {
      usersData = JSON.parse(fs.readFileSync(usersPath, "utf-8"));
    }

    const updatedLoginUsers = [
      ...(usersData.users || []),
      { username, password },
    ];

    fs.writeFileSync(
      usersPath,
      JSON.stringify({ users: updatedLoginUsers }, null, 2),
      "utf-8"
    );

    // 7️⃣ Trả kết quả
    return Response.json({
      success: true,
      message: "Đăng ký thành công!",
      user: { username, email, phone, fullname },
    });
  } catch (error) {
    console.error("Register error:", error);
    return Response.json(
      { success: false, message: "Lỗi hệ thống đăng ký!" },
      { status: 500 }
    );
  }
}
