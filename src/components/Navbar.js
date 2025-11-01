"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { rootData } from "@/app/layout";
import { enqueueSnackbar } from "notistack";

const Navbar = () => {
  const router = useRouter();
  const { user } = rootData();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    enqueueSnackbar("See You Soon Bye!", {
      variant: "warning",
      autoHideDuration: 1000,
    });
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 backdrop-blur-md bg-white/30 border-b border-white/20">
      <div className="text-2xl font-bold">CATALYST IQ</div>

      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <span>Welcome Back {user?.username}</span>
        <ChevronDown size={18} />
      </div>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-4 top-14 bg-white text-black rounded shadow-lg py-2 w-40 z-10">
          <button className="w-full text-left px-4 py-2 hover:bg-gray-100">
            Profile
          </button>
          <button
            onClick={handleLogOut}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
