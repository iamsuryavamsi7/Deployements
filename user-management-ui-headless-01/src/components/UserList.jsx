import React, { useEffect } from 'react'
import AddButton from './AddButton'
import EditButton from './EditButton'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../features/userSlice/users'

const UserList = () => {

    const users = useSelector((state) => state.user.users);

    const status = useSelector((state) => state.user.status);

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch(fetchUsers());

    }, []);

    return (

        <div>

            {status == 'loading' && (

                <h2> Fetching the infomation from API's Please Wait </h2>

            )}

            {status == 'error' && (

                <h2> Sorry for this inconvenience. Our Developers are repairing the API's </h2>
 
            )}

            {status == 'completed' && (

                <>
                
                    <AddButton />

                    <div className="pt-10 w-full">

                        <div className="mx-10 ">

                            <table
                                className='w-full bg-gray-700 rounded-t-xl'
                            >

                                <thead>

                                    <tr
                                        className='h-16 text-left text-white tracking-wider text-xl'
                                    >

                                        <th
                                            className='px-10'
                                        > First Name </th>
                                        <th
                                            className='px-10'
                                        > Last Name </th>
                                        <th
                                            className='px-10'
                                        > Email </th>
                                        <th
                                            className='px-10 text-center'
                                        > Actions </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {users.map((user) => (


                                        <tr
                                            key={user.id}
                                            className='h-16 text-left text-black tracking-wider bg-white shadow-2xl text-lg'
                                        >

                                            <td
                                                className='px-10'
                                            > {user.firstName} </td>
                                            <td
                                                className='px-10'
                                            > {user.lastName} </td>
                                            <td
                                                className='px-10'
                                            > {user.email} </td>
                                            <td
                                                className='px-10 text-center'
                                            >  
                                            
                                                <EditButton
                                                    id={user.id}
                                                />

                                            </td>

                                        </tr>
                                        
                                    ))}


                                </tbody>

                            </table>

                        </div>

                    </div>

                </>

            )}

        </div>

    )

}

export default UserList