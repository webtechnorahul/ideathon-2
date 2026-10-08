import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";

const GoogleIcon = () => (
    <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            fill="#4285F4"
            d="M21.35 12.27c0-.72-.06-1.42-.18-2.09H12v3.96h5.23a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.24z"
        />

        <path
            fill="#34A853"
            d="M12 21.82c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.72-5.46-4.03H3.29v2.52A9.75 9.75 0 0 0 12 21.82z"
        />

        <path
            fill="#FBBC05"
            d="M6.54 13.92a5.86 5.86 0 0 1 0-3.75V7.65H3.29a9.82 9.82 0 0 0 0 8.79l3.25-2.52z"
        />

        <path
            fill="#EA4335"
            d="M12 6.14c1.43 0 2.71.49 3.72 1.46l2.79-2.79C16.84 3.25 14.63 2.18 12 2.18a9.75 9.75 0 0 0-8.71 5.47l3.25 2.52C7.31 7.86 9.46 6.14 12 6.14z"
        />
    </svg>
);

const Login = () => {
    const navigate = useNavigate();
    const { handleLogin } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setError("");

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Please fill in all fields");
            return;
        }

        try {
            setLoading(true);

            await handleLogin(formData);

            toast.success("Login successful!");

            navigate("/");
        } catch (error) {
            console.log("Login error:", error);

            const responseData = error.response?.data?.message;

            if (Array.isArray(responseData)) {
                const messages = responseData
                    .map((err) => err.msg)
                    .filter(Boolean)
                    .join(", ");

                setError(messages || "Please check your input.");
            } else {
                setError(
                    responseData ||
                    "Login failed. Please check your email and password."
                );
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = "http://localhost:3000/api/auth/google";
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Welcome Back
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Login to continue to your account
                    </p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* Error */}
                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-green-500
                         focus:border-transparent transition
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>

                            {/* Forgot Password */}
                            <button
                                type="button"
                                onClick={() => navigate("/forgot-password")}
                                className="text-sm font-medium text-green-600
                           hover:text-green-700 hover:underline"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            disabled={loading}
                            className="w-full px-4 py-3 rounded-lg border border-gray-300
                         focus:outline-none focus:ring-2 focus:ring-green-500
                         focus:border-transparent transition
                         disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3 rounded-lg bg-green-600 text-white
                       font-semibold hover:bg-green-700 transition
                       disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200" />

                    <span className="text-sm text-gray-400">
                        OR
                    </span>

                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Google Login */}
                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    disabled={loading}
                    className="w-full py-3 rounded-lg border border-gray-300
                     bg-white text-gray-700 font-medium
                     hover:bg-gray-50 transition
                     flex items-center justify-center gap-3
                     disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <GoogleIcon />

                    <span>
                        Continue with Google
                    </span>
                </button>

                {/* Register */}
                <p className="text-center text-sm text-gray-500 mt-7">
                    Don't have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/register")}
                        className="text-green-600 font-semibold hover:text-green-700"
                    >
                        Create an account
                    </button>
                </p>

            </div>
        </div>
    );
};

export default Login;