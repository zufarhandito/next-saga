
import React, { useState, useEffect, Fragment } from 'react';
import { Transition } from '@headlessui/react';
import Nav from './Nav';
import Sidebar from './sidebar';

const Layout = ({children}: any) => {
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
      if (typeof window != undefined) {
        addEventListener('resize', handleResize);
      }
  
      return () => {
        removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
      <>
        {/* anjay */}
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
          <Sidebar/>
        </Transition>
        <main
          className={`transition-all duration-[400ms] pt-24 pb-10 min-h-screen ${
            showNav && !isMobile ? 'pl-56' : ''
          }`}
        >
          <div className="px-4 md:px-16">{children}</div>
        </main>
      </>
    );
}

export default Layout