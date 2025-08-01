import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center px-4 py-3 sm:px-20 xl:px-32 ">
      <img
        // src={assets.logo}
        src="/logo1.png"
        alt="logo"
        className="w-32 sm:w-44 cursor-pointer"
        onClick={() => navigate("/")}
      />
      {user ? (
        <UserButton />
      ) : (
        <button
          className="flex items-center gap-2 text-sm cursor-pointer bg-primary text-white px-10 py-2.5 rounded-full"
          onClick={openSignIn}
        >
          Get Started <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};

export default Navbar;
