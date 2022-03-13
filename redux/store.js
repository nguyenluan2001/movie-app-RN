import { configureStore } from "@reduxjs/toolkit";
import GenreSlice from "./slices/genre";
import UserSlice from "./slices/user";
const store = configureStore({
    reducer:{
        "genre": GenreSlice,
        "user": UserSlice
    }
})
export {store};