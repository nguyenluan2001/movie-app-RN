import { createSlice } from "@reduxjs/toolkit";
const user = createSlice({
    name: 'user',
    initialState: null,
    reducers:{
        getLoginUser:(state, action) => {
            return action.payload;
        }
    }
})
export const {getLoginUser} = user.actions;
export default user.reducer;