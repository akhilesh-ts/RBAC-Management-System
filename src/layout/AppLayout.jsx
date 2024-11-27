
import NavBar from "../components/header/NavBar"
import NavigationBar from "../components/header/NavigationBar";
import { Outlet, useNavigate} from "react-router-dom";
import { useEffect } from "react";


const AppLayout = () => {

 
  const navigate=useNavigate()

 const user=localStorage.getItem('logedinUser')


  useEffect(()=>{
    if(!user){
      navigate('/')
    }else{
      navigate('/rbac')
    }

  },[user,navigate])
  
 
  return (
    // <div className="bg-darkBlue">
    //   <NavBar />
    //   <div className="w-full flex items-center gap-2 ">
        
    //   <NavigationBar/>
      
    
    //   <Outlet />
      
    //   </div>
      
    // </div>

    // space-x-4
    <div className=" h-screen flex flex-col ">
  <NavBar />
  <div className="flex flex-1 overflow-hidden  ">
    
    <NavigationBar className="hidden lg:block"/>
    
    {/* flex-1 overflow-y-auto  */}
    <div className=" w-full overflow-y-auto  p-4 ">
     <Outlet/>
    </div>
  </div>
</div>



  );
};

export default AppLayout;
