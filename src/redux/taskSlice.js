import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";


export const fetchTasks = createAsyncThunk("tasks/fetch", async (params = {}) => {
  const { page = 1, status = "", user_id = "" } = params;
  const res = await API.get(`/tasks`, {
    params: { page, status, user_id },
  });
  return res.data;
});



const taskSlice = createSlice({
  name: "tasks",
  initialState: {
    list: [],              
    pagination: {},
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload.data; 
        state.pagination = {
          current_page: action.payload.current_page,
          last_page: action.payload.last_page,
          total: action.payload.total,
        };
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default taskSlice.reducer;
