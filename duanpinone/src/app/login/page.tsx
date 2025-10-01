"use client";
import styles from "./login.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data: { success: boolean } = await res.json();
    if (data.success) {
      router.push("/dashboard");
    } else {
      setError("Sai tài khoản hoặc mật khẩu!");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <h1>Welcome to SMART CONTRACT</h1>
        <p>SÀN GIAO DỊCH TIỀN SỐ THÔNG MINH VỚI CÁC TÍNH NĂNG NỔI BẬT</p>
      </div>

      <div className={styles.right}>
        <div className={styles.card}>
          <h2 className={styles.title}>USER LOGIN</h2>
          <input
            className={styles.input}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles.actions}>
            <label>
              <input type="checkbox" /> Remember
            </label>
            <a href="#">Forgot password?</a>
          </div>
          <button className={styles.loginBtn} onClick={handleLogin}>
            LOGIN
          </button>
          <button className={styles.registerBtn} onClick={handleRegister}>
            REGISTER
          </button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    </div>
  );
}
