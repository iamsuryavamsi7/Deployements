import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialStateData = {

    users: [],
    status: '',
    error: false

}

export const fetchUsers = createAsyncThunk('users/fetch', async () => {

    const USER_BASE_URL = "http://localhost:7777/api/v1/users";

    try{

        const response = await fetch(USER_BASE_URL, {

            method: "GET",
            headers: {

                'Content-Type': 'application/json'

            },

        });

        if ( !response.ok ) {

            throw new Error("Something Went Wrong and the problem in userSlice");

        }

        const data = await response.json();

        return data;

    }catch(error) {

        throw error

    }

});

const userSlice = createSlice({

    name: 'users',
    initialState: initialStateData,
    reducers: {

        deleteUserByid: (state, action) => {

            state.users = state.users.filter((user) => user.id != action.payload)

        }

    },
    extraReducers: (builder) => {

        builder.addCase(fetchUsers.rejected, (state, action) => {

            state.status = 'error'
            state.users = []
            state.error = action.error.message

        }).addCase(fetchUsers.pending, (state) => {

            state.status = 'loading'

        }).addCase(fetchUsers.fulfilled, (state, action) => {

            state.status = 'completed'
            state.users = action.payload

        })

    }

});

export default userSlice.reducer;

export const { deleteUserByid } = userSlice.actions