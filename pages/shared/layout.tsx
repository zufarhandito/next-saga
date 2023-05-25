import React, { useState, useEffect, Fragment } from "react";
import { Transition } from "@headlessui/react";
import Nav from "./Nav";
import Link from "next/link";
import Sidebar from "./sidebar";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import jwt from 'jsonwebtoken'
import jwt_decode from 'jwt-decode'

const Layout = ({ children }: any) => {
  const router = useRouter();
  const [isExpired,setIsExpired] = useState(false)
  const [exp,setExp] = useState('')
  const [showNav, setShowNav] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  function handleResize() {
    if (innerWidth <= 640) {
      setShowNav(false);
      setIsMobile(true);
    } else {
      setShowNav(true);
      setIsMobile(false);
    }
  }

  useEffect(() => {
  try {
    const token = Cookies.get('access_token')
    if(!token){
      router.push('/login')
      // alert('token gada')
      throw new Error('token habis')
    }
    let decoded:any = jwt_decode(token)

    if (decoded.exp * 1000 - Date.now() <= 0) {
      setIsExpired(true)
      Cookies.remove('access_token')
      router.push('/login')
    }

  } catch (error) {
    alert('token habis')
  }
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  });

  return (
    <>
      <Nav showNav={showNav} setShowNav={setShowNav} />
      <Transition
        as={Fragment}
        show={showNav}
        enter="transform transition duration-[400ms]"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transform duration-[400ms] transition ease-in-out"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <Sidebar />
      </Transition>
      <main
        className={`transition-all duration-[400ms] pt-24 pb-10 min-h-screen ${
          showNav && !isMobile ? "pl-56" : ""
        }`}
      >
        <div className="px-4 md:px-16">{children}</div>
      </main>
    </>
  );
};

export default Layout;
