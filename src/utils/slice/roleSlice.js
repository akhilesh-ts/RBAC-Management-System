import { createSlice } from "@reduxjs/toolkit";
import { addRole, fetchRoles, deleteRole, editRole } from "../api/rolesApi";

const roleSlice = createSlice({
  name: "role",
  initialState: {
    searchQuery:"",
    roles: [],
    loading: false,
    error: null,
    status: null,
  },
  reducers: {
  
    addSearchQuery:(state,action)=>{
      state.searchQuery=action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.roles = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addRole.pending, (state) => {
        state.loading = true;
      })
      .addCase(addRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roles.push(action.payload.role);
        state.status = action.payload.status;
      })
      .addCase(addRole.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.roles = state.roles.filter((item) => item?.id !== action.payload);
      })
      .addCase(editRole.fulfilled,(state,action)=>{
        state.loading=false
        const index=state.roles.findIndex((item)=>item.id===action.payload.role.id)
        state.roles[index]=action.payload.role
      })
    
  },
});

export const {addSearchQuery}=roleSlice.actions
export default roleSlice.reducer;
