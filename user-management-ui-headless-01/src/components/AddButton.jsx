import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../features/userSlice/users';

const AddButton = () => {

    const USER_BASE_URL = "http://localhost:7777/api/v1/users";

    const dispatch = useDispatch();

    const [user, setUser] = useState({

        id: "",
        firstName: "",
        lastName: "",
        email: ""

    })

    const updateUsersFunction = (e) => {

        const value = e.target.value;

        setUser({...user, [e.target.name]: value})

    }

    const addButtonFunction = async (e) => {

        e.preventDefault();

        const response = await fetch(USER_BASE_URL, {

            method: "POST",
            headers: {

                'Content-Type': 'application/json'

            },
            body: JSON.stringify(user)

        })

        dispatch(fetchUsers());

        setUser({

            id: "",
            firstName: "",
            lastName: "",
            email: ""
    
        });

        close();

    }

    const cancelButtonFunction = (e) => {

        e.preventDefault();

        setUser({

            id: "",
            firstName: "",
            lastName: "",
            email: ""
    
        });

        close();

    }

    let [isOpen, setIsOpen] = useState(false)

    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }

    return (

        <div className="pt-28">

            <input 
                className='px-3 py-2 bg-gray-600 mx-10 rounded-xl text-white font-bold font-mono hover:bg-gray-800 cursor-pointer'
                type='submit'
                value={'Add User'}
                onClick={() => open()}
            />

            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex mt-36 ml-6 p-4">
                    <TransitionChild
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 transform-[scale(95%)]"
                        enterTo="opacity-100 transform-[scale(100%)]"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 transform-[scale(100%)]"
                        leaveTo="opacity-0 transform-[scale(95%)]"
                    >
                        <DialogPanel className="w-full max-w-md rounded-xl bg-gray-400 p-6 backdrop-blur-2xl py-10 px-10 ">
                        <DialogTitle as="h3" className="text-lg mb-5 font-medium text-black " >
                            Add User
                        </DialogTitle>
                        
                        <div className="">

                            <label> First Name </label><br />

                            <input 
                                className='rounded-lg w-2/3 my-3'
                                type='text'
                                name='firstName'
                                value={user.firstName}
                                onChange={(e) => updateUsersFunction(e)}
                            /><br />

                            <label> Last Name </label><br />

                            <input 
                                className='rounded-lg w-2/3 my-3'
                                type='text'
                                name='lastName'
                                value={user.lastName}
                                onChange={(e) => updateUsersFunction(e)}
                            /><br />

                            <label> Email </label><br />

                            <input 
                                className='rounded-lg w-2/3 mt-3'
                                type='text'
                                name='email'
                                value={user.email}
                                onChange={(e) => updateUsersFunction(e)}
                            /><br />

                        </div>
                        
                        <div className="mt-4">
                            <button
                            className='bg-gray-600 px-4 py-2 rounded-lg text-white mr-5 hover:bg-gray-700'
                            onClick={(e) => addButtonFunction(e)}
                            >
                            Add
                            </button>

                            <button
                            className='bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-700'
                            onClick={(e) => cancelButtonFunction(e)}
                            >
                            Cancel
                            </button>

                        </div>
                        </DialogPanel>
                    </TransitionChild>
                    </div>
                </div>
                </Dialog>
            </Transition>

        </div>

    )

}

export default AddButton