import { configureStore } from "@reduxjs/toolkit"
import users from "../features/userSlice/users";

const store = configureStore({

    reducer: {

        user: users

    }

});

export default store;