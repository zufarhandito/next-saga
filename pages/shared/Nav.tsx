import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Menu, Transition } from '@headlessui/react';
import { HiArrowLeft, HiChevronDown, HiOutlineMenu, HiPencil } from 'react-icons/hi';

const Nav = ({ showNav, setShowNav }: any) => {
  const router = useRouter();
  const [username, setUserName] = useState('');
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  useEffect(() => {
    const token = localStorage.getItem('userData');
    if (token) {
      const userData = JSON.parse(token);
      setUserName(userData.username);
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
    }
  }, []);
  return (
    <div
      className={`fixed w-full z-10 h-16 flex justify-between bg-white bg-opacity-25 backdrop-blur-md shadow-sm items-center transition-all duration-[400ms] ${showNav ? 'pl-56' : ''
        }`}
    >
      <div className="pl-4 md:pl-16">
        <HiOutlineMenu
          className="h-8 w-8 text-gray-700 cursor-pointer"
          onClick={() => setShowNav(!showNav)}
        />
      </div>
      <div className="flex items-center pr-4 md:pr-16">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full justify-center items-center">
              <picture>
                <img
                  src={`https://ui-avatars.com/api/?name=${firstname}+${lastname}&background=0D8ABC&color=fff`}
                  className="rounded-full h-8 md:mr-4 border-2 border-white shadow-sm"
                  alt="profile picture"
                />
              </picture>
              <span className="hidden md:block font-medium text-gray-700">
                {username}
              </span>
              <HiChevronDown className="ml-2 h-4 w-4 text-gray-700" />
            </Menu.Button>
          </div>
          <Transition
            // as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform scale-95"
            enterTo="transform scale-100"
            leave="transition ease-in duration=75"
            leaveFrom="transform scale-100"
            leaveTo="transform scale-95"
          >
            <Menu.Items className="absolute right-0 w-content z-50 mt-2 origin-top-right bg-white rounded shadow-sm">
              <div className="p-1">
                <Menu.Item>
                  <button className="flex w-full hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center">
                    <HiPencil className="h-4 w-4 mr-2" />
                    Edit
                  </button>
                </Menu.Item>
                <Menu.Item>
                  <button
                    onClick={handleLogout}
                    className="flex w-full hover:bg-orange-500 hover:text-white text-gray-700 rounded p-2 text-sm group transition-colors items-center"
                  >
                    <HiArrowLeft className="h-4 w-4 mr-2" />
                    Logout
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default Nav;
