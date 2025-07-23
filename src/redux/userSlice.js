import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

// Fetch users from Laravel API
export const fetchUsers = createAsyncThunk("users/fetch", async () => {
  const res = await API.get("/users"); // Make sure this route exists in Laravel
  return res.data;
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.list = action.payload;
    });
    builder.addCase(fetchUsers.rejected, (state) => {
      state.status = "failed";
    });
  },
});

export default userSlice.reducer;
