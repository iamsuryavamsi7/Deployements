import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { deleteUserByid, fetchUsers } from '../features/userSlice/users';

const EditButton = ({id}) => {

    const USER_BASE_URL = "http://localhost:7777/api/v1/users";

    const dispatch = useDispatch();

    let [isOpen, setIsOpen] = useState(false)

    const [ user, setUser ] = useState({

        id: id,
        firstName: "",
        lastName: "",
        email: ""

    });

    const updateUsersState = (e) => {

        const value = e.target.value;

        setUser({...user, [e.target.name]: value})

    }

    function open() {
      setIsOpen(true)
    }
  
    function close() {
      setIsOpen(false)
    }

    const editButtonFunction = async (e, i) => {

        e.preventDefault();

        const response = await fetch(USER_BASE_URL + "/" + i, {

            method: "GET",
            headers: {

                'Content-Type': 'application/json'

            }

        })

        if ( !response.ok ) {

            throw new Error("Something went wrong in updateButton");

        }

        const data = await response.json();

        setUser(data);

        open();

    }

    const updateButtonFunction = async (e, i) => {

        e.preventDefault();

        const response = await fetch(USER_BASE_URL + "/" + i, {

            method: "PUT",
            headers: {

                'Content-Type': 'application/json'

            },
            body: JSON.stringify(user)

        })

        dispatch(fetchUsers());

        setUser({

            id: id,
            firstName: "",
            lastName: "",
            email: ""
    
        })

        close();

    }

    const deleteButtonFunction = async (e, i) => {

        e.preventDefault();

        const response = await fetch(USER_BASE_URL + "/" + i, {

            method: "DELETE",
            headers: {

                'Content-Type': 'application/json'

            }

        })

        if ( !response.ok ) {

            throw new Error(" Something went wrong in delete ");

        }

        dispatch(deleteUserByid(i));

        close();

    }

    return (

        <div className="">

            <input 
                className='px-3 py-1 bg-green-500 rounded-xl text-black font-bold font-mono mx-5 hover:bg-green-700 hover:text-white cursor-pointer'
                type='submit'
                value={'Edit'}
                onClick={(e, i) => editButtonFunction(e, id)}
            />

            <input 
                className='px-3 py-1 bg-red-500 rounded-xl text-black font-bold font-mono cursor-pointer hover:bg-red-700 hover:text-white'
                type='submit'
                value={'Delete'}
                onClick={(e, i) => deleteButtonFunction(e, id)}
            />

            <Transition appear show={isOpen}>
                <Dialog as="div" className="relative z-10 focus:outline-none" onClose={close}>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex justify-center mt-40 p-4">
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
                            Update User
                        </DialogTitle>
                        
                        <div className="">

                            <label> First Name </label><br />

                            <input 
                                className='rounded-lg w-2/3 my-3'
                                type='text'
                                name='firstName'
                                value={user.firstName}
                                onChange={(e) => updateUsersState(e)}
                            /><br />

                            <label> Last Name </label><br />

                            <input 
                                className='rounded-lg w-2/3 my-3'
                                type='text'
                                name='lastName'
                                value={user.lastName}
                                onChange={(e) => updateUsersState(e)}
                            /><br />

                            <label> Email </label><br />

                            <input 
                                className='rounded-lg w-2/3 mt-3'
                                type='text'
                                name='email'
                                value={user.email}
                                onChange={(e) => updateUsersState(e)}
                            /><br />

                        </div>
                        
                        <div className="mt-4">
                            <button
                            className='bg-gray-600 px-4 py-2 rounded-lg text-white mr-5 hover:bg-gray-700 cursor-pointer'
                            onClick={(e, i) => updateButtonFunction(e, id)}
                            >
                            Update
                            </button>

                            <button
                            className='bg-gray-600 px-4 py-2 rounded-lg text-white hover:bg-gray-700'
                            onClick={close}
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

export default EditButton