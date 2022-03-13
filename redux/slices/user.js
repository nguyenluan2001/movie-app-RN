import { createSlice } from "@reduxjs/toolkit";
const user = createSlice({
    name: 'user',
    initialState: null,
    reducers:{
        getLoginUser:(state, action) => {
            const {apiKey,displayName, email, phoneNumber, photoURL} = action.payload;
            return {apiKey,displayName, email, phoneNumber, photoURL};
        }
    }
})
export const {getLoginUser} = user.actions;
export default user.reducer;