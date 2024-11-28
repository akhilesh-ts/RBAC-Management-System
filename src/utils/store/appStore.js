import { configureStore } from "@reduxjs/toolkit";
import roleSlice from '../slice/roleSlice'
import userSlice from '../slice/userSlice'

const appStore=configureStore({
reducer:{
    roles:roleSlice,
    user:userSlice
}
})
    
export default appStore