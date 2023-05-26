import React, { LegacyRef, forwardRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  HomeIcon,
  UserIcon,
  TagIcon,
  CubeIcon,
} from "@heroicons/react/24/solid";
import Cookies from "js-cookie";

const Sidebar = forwardRef(({}, ref: LegacyRef<HTMLDivElement>) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('access_token')

    localStorage.removeItem("userData");
    
    router.push("/login");
  };

  const listMenu = [
    { to: "/", path: "/", icon: <HomeIcon />, name: "Home" },
    { to: "/users", path: "/users", icon: <UserIcon />, name: "User" },
    {
      to: "/categories",
      path: "/categories",
      icon: <TagIcon />,
      name: "Category",
    },
    { to: "/products", path: "/products", icon: <CubeIcon />, name: "Product" },
  ];

  return (
    <div ref={ref} className="fixed z-20 w-56 h-full bg-white shadow-sm">
      <div className="flex justify-center mt-6 mb-14">
        <p className="rotate-6 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text text-3xl mt-5 font-black ">
          Gokil <br /> Shop{" "}
        </p>
      </div>

      <div className="flex flex-col mx-5">
        {listMenu.map((arr) => (
          <Link href={`${arr.to}`}>
            <div
              className={`pl-6 py-3 rounded text-center cursor-pointer mb-3 flex items-center transition-colors ${
                router.pathname === arr.path
                  ? "bg-purple-100 text-purple-500"
                  : "text-gray-400 hover:bg-purple-100 hover:text-purple-500"
              }`}
            >
              <div className="flex">
                <div className="w-5 mr-4">{arr.icon}</div>
                <div>{arr.name}</div>
              </div>
            </div>
          </Link>
        ))}
        <button
          className="mt-4 px-4 py-2 w-3/4 border border-transparent rounded-md bg-purple-200 text-sm font-medium text-purple-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:order-1"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
});

export default Sidebar;
