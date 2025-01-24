"use client";

import CustomInput from "../CustomInput";
import Loading from "../Loading";
import { login } from "@/utils/api/services";
import useAuthRedirect from "@/utils/hooks/UseAuthRedirect";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LoginForm = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter() as ReturnType<typeof useRouter>;

  useAuthRedirect();

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = { username, password };
    login(data, setLoading, setError, router);
  };

  if (loading) return <Loading />;

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-gray-700">
      <form
        onSubmit={(e) => {
          handelSubmit(e);
        }}
        className="p-8 bg-white shadow-2xl rounded-lg max-w-md w-full"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Login
        </h1>

        <CustomInput
          type="text"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          label="User Name"
          placeholder="Username"
          className="text-gray-700"
        />
        <CustomInput
          type="password"
          name="password"
          value={password}
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="text-gray-700"
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