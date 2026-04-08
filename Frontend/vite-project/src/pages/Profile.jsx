import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Profile = () => {
  const [darkMode, setDarkMode] = useState(false);

  const [user, setUser] = useState({
    name: "Bryan Joe Mbadiwe",
    email: "bryan@example.com",
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
  });

  // Load theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  const handleProfileUpdate = () => {
    console.log("Updated user:", user);
    alert("Profile updated!");
  };

  const handlePasswordChange = () => {
    console.log("Password change:", passwords);
    alert("Password changed!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 to-white dark:from-gray-900 dark:to-gray-800">

      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        Profile & Settings
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <motion.div className="bg-white dark:bg-gray-900 rounded-2xl shadow p-6 text-center">
          <div className="w-24 h-24 mx-auto rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl">
            👤
          </div>
          <h2 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
            {user.name}
          </h2>
          <p className="text-gray-500">{user.email}</p>
        </motion.div>

        {/* Edit Profile */}
        <motion.div className="md:col-span-2 bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
          <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
            Edit Profile
          </h3>

          <div className="grid gap-4">
            <input
              type="text"
              value={user.name}
              onChange={(e) =>
                setUser({ ...user, name: e.target.value })
              }
              className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Full Name"
            />

            <input
              type="email"
              value={user.email}
              onChange={(e) =>
                setUser({ ...user, email: e.target.value })
              }
              className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Email"
            />

            <button
              onClick={handleProfileUpdate}
              className="bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition"
            >
              Save Changes
            </button>
          </div>
        </motion.div>
      </div>

      {/* Password Section */}
      <motion.div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Change Password
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          <input
            type="password"
            placeholder="Current Password"
            value={passwords.current}
            onChange={(e) =>
              setPasswords({ ...passwords, current: e.target.value })
            }
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />

          <input
            type="password"
            placeholder="New Password"
            value={passwords.new}
            onChange={(e) =>
              setPasswords({ ...passwords, new: e.target.value })
            }
            className="p-3 rounded-xl border dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
        </div>

        <button
          onClick={handlePasswordChange}
          className="mt-4 bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600 transition"
        >
          Update Password
        </button>
      </motion.div>

      {/* Settings Section */}
      <motion.div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl shadow p-6">
        <h3 className="font-semibold mb-4 text-gray-800 dark:text-white">
          Preferences
        </h3>

        <div className="flex items-center justify-between">
          <span className="text-gray-600 dark:text-gray-300">
            Dark Mode
          </span>

          <button
            onClick={toggleDarkMode}
            className="px-4 py-1 rounded-xl bg-gray-200 dark:bg-gray-700"
          >
            {darkMode ? "ON 🌙" : "OFF ☀️"}
          </button>
        </div>
      </motion.div>

      {/* Logout */}
      <motion.div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition"
        >
          Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;