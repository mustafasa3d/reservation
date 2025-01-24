"use client";

import { useEffect, useState } from "react";

import Loading from "../Loading";
import { login } from "@/utils/api/services";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter() as ReturnType<typeof useRouter>;

  const handleLogin = async () => {
    setLoading(true);
    const user = await login({ username, password });

    if (user) {
      if (user.role === "admin") router.push("/admin");
      if (user.role === "user") router.push("/user");
      setLoading(false);
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (token && role === "admin") router.push("/admin");
    if (token && role === "user") router.push("/user");
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-700">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        className="p-8 bg-white shadow-2xl rounded-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>

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

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <button
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
