import { configureStore } from "@reduxjs/toolkit";
import signupSlice from "./signupDataSlice";
import userSliceReducer from "./userSlice";
import userFeedReducer from "./userFeedSlice";
import connectionRequestReudcer from "./connectionRequestSlice";

const appStore = configureStore({
  reducer: {
    user: userSliceReducer
  },
});

export default appStore;
