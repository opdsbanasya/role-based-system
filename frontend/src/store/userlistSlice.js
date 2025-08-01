import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "users",
  initialState: null,
  reducers: {
    addUserInList: (state, action) => {
      return action.payload;
    },
    removeUserFromList: (state, action) => {
      return null;
    },
    updateUserInList: (state, action) => {
      return {...state, ...action.payload};
    }
  },
});

export const { addUserInList, removeUserFromList, updateUserInList } = userSlice.actions;

export default userSlice.reducer;
