import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

function Nav() {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);

  const profileRef = useRef(null);

  // Get first letter of fullname
  const profileLetter = user?.fullname?.charAt(0)?.toUpperCase();

  const navLinkClass = ({ isActive }) =>
    `transition ${
      isActive
        ? "font-semibold text-green-600"
        : "text-gray-700 hover:text-green-600"
    }`;

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      // Backend clears the token cookie
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      // Clear Redux user state
      dispatch({
        type: "auth/logout",
      });

      setShowProfile(false);

      toast.success("Logged out successfully");

      // Navigate to home
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);

      toast.error(
        error.response?.data?.message || "Logout failed"
      );
    }
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600"
        >
          MyApp
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">

          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/create" className={navLinkClass}>
            Create
          </NavLink>

          <NavLink to="/roadmaps" className={navLinkClass}>
            Roadmaps
          </NavLink>

          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>

        </div>

        {/* Right Side */}
        <div className="relative">

          {user ? (
            <div ref={profileRef}>

              {/* Profile Avatar */}
              <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 font-semibold text-white transition hover:bg-green-700"
                title={user.fullname}
              >
                {profileLetter}
              </button>

              {/* Profile Popup */}
              {showProfile && (
                <div className="absolute right-0 top-14 z-50 w-72 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">

                  {/* User Information */}
                  <div className="mb-4 border-b border-gray-200 pb-4">

                    <div className="mb-3 flex items-center gap-3">

                      {/* Large Avatar */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-600 text-lg font-semibold text-white">
                        {profileLetter}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {user.fullname}
                        </p>

                        <p className="truncate text-sm text-gray-500">
                          {user.email}
                        </p>
                      </div>

                    </div>

                  </div>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="w-full rounded-lg border border-red-500 px-4 py-2.5 font-medium text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          ) : (
            <Link
              to="/login"
              className="rounded-lg bg-green-600 px-5 py-2.5 font-medium text-white transition hover:bg-green-700"
            >
              Login
            </Link>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Nav;