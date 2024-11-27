import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axios/axios";

//fetch role
export const fetchRoles = createAsyncThunk("roles/fetchRoles", async () => {
  const response = await axiosInstance.get("/roles");
  return response.data;
});

//add role

export const addRole = createAsyncThunk("role/addRole", async (role) => {
  const response = await axiosInstance.post("/roles", role);
  return {
    role: response.data,
    status: response.status,
  };
});

//edit role

export const editRole = createAsyncThunk("role/editRole", async (role) => {
  const response = await axiosInstance.put(`/roles/${role?.id}`, role);

  return {
    role: response.data,
    status: response.status,
  };
});

//delete role

export const deleteRole = createAsyncThunk("role/deleteRole", async (id) => {
  await axiosInstance.delete(`/roles/${id}`);
  return id;
});
