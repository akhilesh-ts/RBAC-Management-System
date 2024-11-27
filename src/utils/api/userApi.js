import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";

//fetch user

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await axiosInstance.get("/user");
  return response.data;
});

//add user
export const addUser = createAsyncThunk("user/addUser", async (user) => {
  const response = await axiosInstance.post("/user", user);
  return {
    user: response.data,
    status: response.status,
  };
});

// edit user

export const editUser = createAsyncThunk("user/editUser", async (user) => {
  const response = await axiosInstance.put(`/user/${user?.id}`, user);

  return {
    user: response.data,
    status: response.status,
  };
});

//delete user

export const deleteUser = createAsyncThunk("user/delteUser", async (id) => {
  await axiosInstance.delete(`/user/${id}`);
  return id;
});

// change user status

export const changeStatus = createAsyncThunk("user/changeStatus",async (user) => {
   
    const response = await axiosInstance.put(`/user/${user?.id}`, user);
    return response.data;
  }
);
