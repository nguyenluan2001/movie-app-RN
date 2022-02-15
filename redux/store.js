import { configureStore } from "@reduxjs/toolkit";
import GenreSlice from "./slices/genre";
const store = configureStore({
    reducer:{
        "genre": GenreSlice
    }
})
export {store};