"use client";

import { useEffect, useState } from "react";

import { login } from "@/utils/api/auth";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    /* setLoading(true); */
    try {
      const {data:users} = await login({ username, password });
       const user = users?.find(
        (u) => u.username === username && u.password === password
      ); 

      console.log("usersssssssss", user);

      if (user) {
        localStorage.setItem("token", user.token);
        localStorage.setItem("role", user.role);

        if (user.role === "admin") {
          router.push("/admin"); // توجيه إلى صفحة الأدمن
        } else {
          router.push("/user"); // توجيه إلى صفحة المستخدم العادي
        }
      } else {
        /*  setError('Invalid username or password'); */
      }

      /* setReservations(data); */
    } catch (error) {
      console.error("Failed to fetch reservations:", error);
      /* setError('Invalid username or password'); */
    } finally {
      /* setLoading(false); */
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="p-6 bg-black shadow-md rounded">
        <h1 className="text-xl font-bold mb-4">Login</h1>
        
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full mb-4 p-2 border border-gray-300 rounded text-black/50"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full mb-4 p-2 border border-gray-300 rounded text-black/50"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm;

