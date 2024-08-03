import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";

const store = configureStore({
  reducer: { // fix reducer configuration error
    user: userReducer,
  },
});

export default store;
