import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../api/useAuth";
import { LoaderCircle, LogIn, UserPlus } from "lucide-react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const success = await login(username, password);
    setIsLoading(false);
    if (success) navigate("/dashboard");
  };

  const handleSignup = () => navigate("/register");

  return (
    <div className="max-w-md mx-auto p-8 mt-20 border rounded-2xl shadow-lg bg-white animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back 👋</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 bg-blue-600 text-white w-full py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? <LoaderCircle className="animate-spin w-5 h-5" /> : <LogIn className="w-5 h-5" />}
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?
        <button
          onClick={handleSignup}
          className="ml-1 text-blue-600 hover:underline inline-flex items-center gap-1 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          Sign up
        </button>
      </div>
    </div>
  );
}
