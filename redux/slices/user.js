import { createSlice } from "@reduxjs/toolkit";
const user = createSlice({
    name: 'user',
    initialState: null,
    reducers:{
        getLoginUser:(state, action) => {
            return action.payload;
        },
        updateProfile:(state, action) => {
            let {displayName, photoURL} = action.payload;
            state.displayName = displayName;
            state.photoURL = photoURL;
        },
        logout: () => {
            return {};
        }
    }
})
export const {getLoginUser, logout, updateProfile} = user.actions;
export default user.reducer;