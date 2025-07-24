import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/me", { credentials: "include" })
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Unauthorized");
      })
      .then(data => {
        // ถ้า login สำเร็จ
        navigate("/dashboard");
      })
      .catch(() => {
        // ถ้าไม่ได้ login
        navigate("/");
      });
  }, [navigate]);

  return <div>กำลังเข้าสู่ระบบ...</div>;
};

export default LoginSuccess;