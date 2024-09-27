import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

interface LoginResponse {
  token: string;
  message: string;
}

const SignIn: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formData = JSON.stringify({ username, password });

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        const data: LoginResponse = await response.json();
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen text-center bg-gray-100">
      <h2 className="text-primary text-5xl mb-4 font-bold">CSV Reader 📜</h2>
      <div className="text-secondary text-1xl mb-3 font-bold">
        (Work in Progress) - Adding CRUD operations for uploaded files that are
        linked to users
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl text-neutral-500 mb-6 font-semibold">
          Sign In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-neutral-500 text-left mb-2 font-semibold">
              Username:
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-neutral-500 text-left mb-2 font-semibold">
              Password:
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <button
              type="submit"
              className="w-full bg-primary text-white p-3 rounded-lg font-semibold hover:bg-primary-dark transition duration-200 hover:bg-red-400 "
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="w-full bg-neutral-300 text-white p-3 rounded-lg font-semibold hover:bg-neutral-400 transition duration-200"
            >
              Sign Up
            </button>
          </div>
        </form>
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default SignIn;
