import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../contexts/AuthContext";
import { Starfield } from "../components/Starfield";

interface LoginForm {
  username: string;
  password: string;
}

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);
    setError("");
    try {
      await login(data.username, data.password);
    } catch (error: any) {
      setError(error.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative">
      <Starfield />
      <div className="w-full max-w-md mx-auto p-6 z-10">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="star-wars-font text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 mb-4 glow">
            IMPERIAL DATABASE
          </h1>
          <p className="star-wars-font text-lg text-gray-300 tracking-wider">SYSTEM LOGIN</p>
        </div>

        {/* Login Form */}
        <div className="bg-black bg-opacity-50 backdrop-blur-sm rounded-lg p-8 border border-blue-500 glow scan-line">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="star-wars-font block text-blue-300 text-sm font-bold mb-2 tracking-wide">
                USERNAME
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-3 bg-gray-900 bg-opacity-80 border border-blue-400 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 star-wars-font transition-all duration-300"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
                disabled={isLoading}
              />
              {errors.username && <div className="text-red-400 text-xs mt-1">{errors.username.message}</div>}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="star-wars-font block text-blue-300 text-sm font-bold mb-2 tracking-wide">
                PASSWORD
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full px-4 py-3 bg-gray-900 bg-opacity-80 border border-blue-400 rounded-lg focus:outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 star-wars-font transition-all duration-300 pr-12"
                  placeholder="Enter your password"
                  {...register("password", { required: "Password is required" })}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-300 hover:text-blue-100 focus:outline-none"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}>
                  {"👁️‍🗨️"}
                </button>
              </div>
              {errors.password && <div className="text-red-400 text-xs mt-1">{errors.password.message}</div>}
            </div>

            {/* Error message */}
            {error && <div className="text-red-400 text-sm bg-red-900/20 p-3 rounded glow-red">{error}</div>}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full star-wars-font font-bold py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 btn-hover tracking-wider"
              disabled={isLoading}>
              {isLoading ? "Logging in..." : "ACCESS THE SYSTEM"}
            </button>
          </form>
        </div>

        {/* Ambiance message */}
        <div className="text-center mt-8">
          <p className="star-wars-font text-sm text-gray-400 italic tracking-wide">"May the Force be with you"</p>
        </div>
      </div>
    </div>
  );
};
