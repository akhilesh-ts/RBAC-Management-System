import { createSlice } from "@reduxjs/toolkit";
import { addUser, changeStatus, deleteUser, editUser, fetchUser } from "../api/userApi";



const userSlice=createSlice({
    name:'user',
    initialState:{
        searchQuery:"",
        user:[],
        loading:false,
        error:null,
  
    },
    reducers:{
      setSearchQuery:(state,action)=>{
        state.searchQuery=action.payload
      },
     
      
    },
    extraReducers:(builder)=>{
        builder
        .addCase(addUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(addUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user.push(action.payload.user)
        })
        .addCase(addUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(fetchUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload
        })
        .addCase(fetchUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(deleteUser.fulfilled,(state,action)=>{
            state.user=state.user.filter((item)=>item.id!==action.payload)
        })

        .addCase(editUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(editUser.fulfilled,(state,action)=>{
            state.loading=false
            const index=state.user.findIndex((user)=>user.id===action.payload.user.id)
            state.user[index]=action.payload.user
        })
        .addCase(editUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.error.message
        })
        .addCase(changeStatus.fulfilled, (state, action) => {
            state.loading = false;
            const userIndex = state.user.findIndex((item) => item.id === action.payload.id);
 
            if (userIndex !== -1) {
              state.user[userIndex] = action.payload; 
            }
          })
          .addCase(changeStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
          
    }
})

export const {setSearchQuery}=userSlice.actions
export default userSlice.reducer
