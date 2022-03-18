import { createSlice } from "@reduxjs/toolkit";
const user = createSlice({
    name: 'user',
    initialState: null,
    reducers:{
        getLoginUser:(state, action) => {
            return action.payload;
        },
        updateProfile:(state, action) => {
            let {displayName, email} = action.payload;
            state.displayName = displayName;
            state.email = email;
        },
        logout: () => {
            return {};
        }
    }
})
export const {getLoginUser, logout, updateProfile} = user.actions;
export default user.reducer;