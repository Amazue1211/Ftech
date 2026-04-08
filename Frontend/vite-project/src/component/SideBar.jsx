import { NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { name: "Dashboard", path: "/", icon: "🏠" },
    { name: "Transactions", path: "/transactions", icon: "💳" },
    { name: "Analytics", path: "/analytics", icon: "📊" },
    { name: "Budget", path: "/budget", icon: "📅" },
    { name: "Savings", path: "/savings", icon: "💰" },
    { name: "AI Assistant", path: "/ai", icon: "🤖" },
    { name: "Profile", path: "/profile", icon: "👤" },
  ];

  return (
    <motion.div
      animate={{ width: collapsed ? 80 : 240 }}
      className="h-screen bg-white dark:bg-gray-900 shadow-lg flex flex-col justify-between transition-all duration-300"
    >
      {/* Top Section */}
      <div>
        {/* Logo */}
        <div className="flex items-center justify-between p-4">
          {!collapsed && (
            <h1 className="text-xl font-bold text-indigo-600">FinFlow</h1>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-indigo-500"
          >
            {collapsed ? "➡️" : "⬅️"}
          </button>
        </div>

        {/* Menu */}
        <nav className="mt-4 flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <NavLink
              key={i}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 mx-2 px-3 py-2 rounded-xl transition-all 
                ${
                  isActive
                    ? "bg-indigo-500 text-white"
                    : "text-gray-600 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-gray-800"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="p-4">
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition">
          <span>🚪</span>
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.div>
  );
};

export default Sidebar;