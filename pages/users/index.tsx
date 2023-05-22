import React, { useEffect, useState, Fragment } from 'react';
import Content from '../content';
import { Menu, Transition } from '@headlessui/react';
import ConfirmDelete from '../ConfirmDelete';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { doDelete, doRequestGetUser } from '../redux/action/ActionReducer';

function EditInactiveIcon(props:any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
    </svg>
  );
}

function EditActiveIcon(props:any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 13V16H7L16 7L13 4L4 13Z"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
    </svg>
  );
}

function DeleteInactiveIcon(props:any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#EDE9FE"
        stroke="#A78BFA"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#A78BFA" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#A78BFA" strokeWidth="2" />
    </svg>
  );
}

function DeleteActiveIcon(props:any) {
  return (
    <svg
      {...props}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="6"
        width="10"
        height="10"
        fill="#8B5CF6"
        stroke="#C4B5FD"
        strokeWidth="2"
      />
      <path d="M3 6H17" stroke="#C4B5FD" strokeWidth="2" />
      <path d="M8 6V4H12V6" stroke="#C4B5FD" strokeWidth="2" />
    </svg>
  );
}

const User = () => {
  let { user, message, status, refresh } = useSelector(
    (state:any) => state.userReducers,
  );

  const dispatch = useDispatch();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [whatToDelete, setWhatToDelete] = useState();
  const [isMessage, setIsMessage] = useState(false);

  const columns = [
    { name: 'No.' },
    { name: 'Username' },
    { name: 'Firstname' },
    { name: 'Lastname' },
    { name: 'Aksi' },
  ];

  useEffect(() => {
    if (message) {
      toast.success(message);
    }

    dispatch(doRequestGetUser());
  }, [refresh]);

  const goToEdit = (item:any) => {
    router.push({
        pathname: 'edit-user/',
        query: { id: 123 }, 
        // state: { user: item }
      });
  };

  const getWhatToDelete = (data:any) => {
    setWhatToDelete(data);
    setIsDelete(true);
  };

  const deleteData = () => {
    dispatch(doDelete(whatToDelete.id));
    setIsDelete(false);
  };

  return (
    <>
      {isDelete ? (
        <ConfirmDelete
          show={isDelete}
          table="User"
        //   name={whatToDelete.username}
        //   id={whatToDelete.id}
          closeModal={() => setIsDelete(false)}
          funcion={getWhatToDelete}
          remove={deleteData}
        />
      ) : (
        ''
      )}
      <Content
        title="users"
        isOpen={() => {
          setIsOpen(true);
        }}
      >
        <div className="p-5 rounded-2xl bg-white bg-opacity-50">
          <ToastContainer />
          <table className="min-w-full table-fixed ">
            <thead>
              <tr>
                {(columns || []).map((col) => (
                  <th className="pr-6 py-4 text-left text-xs font-medium text-gray-800 uppercase tracking-wider">
                    <span className="">{col.name}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="">
              {(user || []).map((data:any, index:any) => (
                // {console.log(data[index])}
                // JSON.stringify(data.customer)
                <tr key={data.id}>
                  <td className="py-3 text-sm text-gray-600">{index + 1}</td>
                  <td className="py-3 text-sm text-gray-600">
                    {data.username}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {data.customer.firstname}
                  </td>
                  <td className="py-3 text-sm text-gray-600">
                    {data.customer.lastname}
                  </td>
                  <td>
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex w-full justify-center rounded-md px-4 py-2 text-sm font-black text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                          {/* <EllipsisVerticalIcon /> */} :
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute right-10 top-0 w-32 rounded-md bg-white shadow-lg focus:outline-none">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => goToEdit(data)}
                                  className={`${
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  {active ? (
                                    <EditActiveIcon
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <EditInactiveIcon
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Edit
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  onClick={() => getWhatToDelete(data)}
                                  className={`${
                                    active
                                      ? 'bg-violet-500 text-white'
                                      : 'text-gray-900'
                                  } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                                >
                                  {active ? (
                                    <DeleteActiveIcon
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <DeleteInactiveIcon
                                      className="mr-2 h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                  Delete
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Content>
    </>
  );
};

export default User;
