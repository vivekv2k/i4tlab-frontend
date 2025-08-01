import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./taskSlice";
import userReducer from "./userSlice";

export default configureStore({
  reducer: {
    tasks: taskReducer,
    users: userReducer,
  },
});
