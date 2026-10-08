
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

const Register = () => {
    const navigate = useNavigate();

    const { handleRegister } = useAuth();

    const [loading, setLoading] = useState(false);

    // Keep error as a single string
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
    });

    // ==========================================
    // Handle Input Change
    // ==========================================

    const handleChange = (e) => {
        setError("");

        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    // ==========================================
    // Extract Backend Error
    // ==========================================

    const getErrorMessage = (error) => {
        const responseData = error?.response?.data;

        console.log("Backend error:", responseData);

        const message = responseData?.message;

        // ==========================================
        // Case 1:
        // { message: "User already exists" }
        // ==========================================

        if (typeof message === "string") {
            return message;
        }

        // ==========================================
        // Case 2:
        // {
        //   message: [
        //     {
        //       type: "field",
        //       msg: "Password must contain..."
        //     }
        //   ]
        // }
        // ==========================================

        if (Array.isArray(message)) {
            return message
                .map((item) => {
                    // If message is already a string
                    if (typeof item === "string") {
                        return item;
                    }

                    // If message is an object
                    if (item && typeof item === "object") {
                        return (
                            item.msg ||
                            item.message ||
                            item.error ||
                            item.defaultMessage ||
                            null
                        );
                    }

                    return null;
                })
                .filter(Boolean)
                .join(", ");
        }

        // ==========================================
        // Case 3:
        // { error: "Something went wrong" }
        // ==========================================

        if (typeof responseData?.error === "string") {
            return responseData.error;
        }

        // ==========================================
        // Case 4:
        // Axios error
        // ==========================================

        if (error?.message) {
            return error.message;
        }

        // ==========================================
        // Fallback
        // ==========================================

        return "Registration failed. Please try again.";
    };

    // ==========================================
    // Submit Form
    // ==========================================

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // ==========================================
        // Frontend Validation
        // ==========================================

        if (!formData.fullName.trim()) {
            setError("Please enter your full name");
            return;
        }

        if (!formData.email.trim()) {
            setError("Please enter your email");
            return;
        }

        if (!formData.password) {
            setError("Please enter your password");
            return;
        }

        try {
            setLoading(true);

            // Call useAuth
            await handleRegister(formData);

            // Success
            toast.success("Account created successfully!");

            // Navigate to Login
            navigate("/login");
        } catch (error) {
            console.error("Registration error:", error.response.data.message);

            // Get single formatted error string
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
        }
        finally {
            setLoading(false);
        }
    }

    // ==========================================
    // Google Register
    // ==========================================

    const handleGoogleRegister = () => {
        window.location.href = "http://localhost:3000/api/auth/google";
    };

    // ==========================================
    // UI
    // ==========================================

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

                {/* =====================================
            Heading
        ====================================== */}

                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        Join us and get started today
                    </p>
                </div>

                {/* =====================================
            Register Form
        ====================================== */}

                <form onSubmit={handleSubmit} className="space-y-5">

                    {/* ===================================
              ERROR
          ==================================== */}

                    {error && (
                        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                            {error}
                        </div>
                    )}

                    {/* ===================================
              FULL NAME
          ==================================== */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name
                        </label>

                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            disabled={loading}
                            className="
                w-full px-4 py-3 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-green-500
                focus:border-transparent transition
                disabled:bg-gray-100 disabled:cursor-not-allowed
              "
                        />
                    </div>

                    {/* ===================================
              EMAIL
          ==================================== */}

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
                            className="
                w-full px-4 py-3 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-green-500
                focus:border-transparent transition
                disabled:bg-gray-100 disabled:cursor-not-allowed
              "
                        />
                    </div>

                    {/* ===================================
              PASSWORD
          ==================================== */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            disabled={loading}
                            className="
                w-full px-4 py-3 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-green-500
                focus:border-transparent transition
                disabled:bg-gray-100 disabled:cursor-not-allowed
              "
                        />
                    </div>

                    {/* ===================================
              REGISTER BUTTON
          ==================================== */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="
              w-full py-3 rounded-lg bg-green-600 text-white
              font-semibold hover:bg-green-700 transition
              disabled:opacity-60 disabled:cursor-not-allowed
            "
                    >
                        {loading ? "Creating account..." : "Create Account"}
                    </button>
                </form>

                {/* =====================================
            DIVIDER
        ====================================== */}

                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-200" />

                    <span className="text-sm text-gray-400">
                        OR
                    </span>

                    <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* =====================================
            GOOGLE REGISTER
        ====================================== */}

                <button
                    type="button"
                    onClick={handleGoogleRegister}
                    disabled={loading}
                    className="
            w-full py-3 rounded-lg border border-gray-300
            bg-white text-gray-700 font-medium
            hover:bg-gray-50 transition
            flex items-center justify-center gap-3
            disabled:opacity-60 disabled:cursor-not-allowed
          "
                >
                    <GoogleIcon />

                    <span>
                        Continue with Google
                    </span>
                </button>

                {/* =====================================
            LOGIN
        ====================================== */}

                <p className="text-center text-sm text-gray-500 mt-7">
                    Already have an account?{" "}

                    <button
                        type="button"
                        onClick={() => navigate("/login")}
                        className="
              text-green-600 font-semibold
              hover:text-green-700
            "
                    >
                        Login
                    </button>
                </p>

            </div>
        </div>
    );
};

export default Register;
