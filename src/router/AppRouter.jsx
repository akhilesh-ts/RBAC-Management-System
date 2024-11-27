import { createBrowserRouter } from "react-router-dom";
import Login from '../page/Login'
import Role from '../page/Role'
import Home from "../page/Home";
import AppLayout from '../layout/AppLayout'
import User from '../page/User'
import Profile from "../components/body/user/Profile";

 const AppRouter=createBrowserRouter([

    {
        path:'/',
        element:<Login/>
    },
    {
        path:'/rbac',
        element:<AppLayout/>,
        children:[
            {
                path:'/rbac',
                element:<Home/>
            },
            {
                path:'/rbac/role',
                element:<Role/>
            },
            {
                path:'/rbac/user',
                element:<User/>
            },
            {
                path:'/rbac/profile',
                element:<Profile/>
            }
        ]
    }
]

)





export default AppRouter