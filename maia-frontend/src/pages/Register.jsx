import React, { useState } from "react";
import { useAuth } from "../api/useAuth";
import { useNavigate } from "react-router-dom";
import { UserPlus, Mail, Lock, LogIn, LoaderCircle } from "lucide-react";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "" });
  const [loading, setLoading] = useState(false);
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const success = await register(form.username, form.email, form.password, form.password2);
    setLoading(false);
    if (success) navigate("/dashboard");
  };

  const goToLogin = () => {
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 border rounded-2xl shadow-xl bg-white">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 flex items-center justify-center gap-2">
        <UserPlus className="w-6 h-6" /> Create Your Account
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center border rounded px-3">
          <UserPlus className="text-gray-400" />
          <input
            className="w-full p-2 focus:outline-none"
            type="text"
            placeholder="Username"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
        </div>

        <div className="flex items-center border rounded px-3">
          <Mail className="text-gray-400" />
          <input
            className="w-full p-2 focus:outline-none"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="flex items-center border rounded px-3">
          <Lock className="text-gray-400" />
          <input
            className="w-full p-2 focus:outline-none"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="flex items-center border rounded px-3">
          <Lock className="text-gray-400" />
          <input
            className="w-full p-2 focus:outline-none"
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setForm({ ...form, password2: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 transition text-white w-full py-2 rounded font-semibold flex items-center justify-center cursor-pointer"
        >
          {loading ? (
            <LoaderCircle className="animate-spin mr-2" />
          ) : (
            <UserPlus className="mr-2" />
          )}
          {loading ? "Creating..." : "Register"}
        </button>

        <div className="text-center text-sm text-gray-600">or</div>

        <button
          type="button"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 w-full py-2 rounded flex items-center justify-center cursor-pointer"
          onClick={goToLogin}
        >
          <LogIn className="mr-2" />
          Back to Login
        </button>
      </form>

      {error && (
        <p className="text-red-500 text-sm mt-4 text-center whitespace-pre-wrap">
          {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
        </p>
      )}
    </div>
  );
}
