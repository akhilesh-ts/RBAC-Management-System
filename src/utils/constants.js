import { GrHomeRounded } from "react-icons/gr";
import { FaUserCog } from "react-icons/fa";
import { CgUserList } from "react-icons/cg";



export const roleColumns = [
  {
    name: "Role",
    selector: (row) => row.role,
    sortable: true,
  },
  
];


export const userColumns =[
  {
    name:"Name",
    selector:(row)=>row.name,
    sortable:true
  },
  
  {
    name:'Role',
    selector:(row)=>row.role,
    sortable:true
  },
 
]


export const NavigationData = [
    {
      id: 'Home',
      name: "Home",
      icon: <GrHomeRounded />,
      path: "/rbac",
    },
    {
      id: 'Role',
      name: "Role",
      icon: <FaUserCog />,
      path: "/rbac/role",
    },
    {
      id: 'User',
      name: "User",
      icon: <CgUserList />,
      path: "/rbac/user",
    },
    
  ];