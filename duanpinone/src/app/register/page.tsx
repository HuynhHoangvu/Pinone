"use client";
import styles from "./register.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [fullname, setFullName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();

  const handleRegister = async () => {
    if (!fullname || !username || !password || !email || !phone) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        password,
        email,
        phone,
        fullname,
      }),
    });

    const data: { success: boolean; message?: string } = await res.json();

    if (data.success) {
      setSuccess("Đăng ký thành công! Đang chuyển hướng...");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      setError(data.message || "Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Join us today!</h1>
        <p>
          Tạo tài khoản để bắt đầu trải nghiệm trang web của chúng tôi với đầy
          đủ tính năng và tiện ích.
        </p>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>REGISTER</h2>

          <input
            className={styles.input}
            placeholder="Họ và tên"
            onChange={(e) => setFullName(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Tài khoản"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Số điện thoại"
            onChange={(e) => setPhone(e.target.value)}
          />

          <button className={styles.registerBtn} onClick={handleRegister}>
            Đăng ký
          </button>
          <button
            className={styles.backBtn}
            onClick={() => router.push("/login")}
          >
            Quay lại đăng nhập
          </button>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}
        </div>
      </div>
    </div>
  );
}
