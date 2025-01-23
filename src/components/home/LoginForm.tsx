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
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-700">
    <div className="p-8 bg-white shadow-2xl rounded-lg max-w-md w-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>
      
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
      />
  
      <button
        onClick={handleLogin}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
      >
        Login
      </button>
    </div>
  </div>
  );
};

export default LoginForm;

