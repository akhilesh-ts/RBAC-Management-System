import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { userColumns } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../utils/api/rolesApi";
import EditUser from "./EditUser";
import UserDetails from "./UserDetails";
import UserStatus from "./UserStatus";
import DeleteUser from "./DeleteUser";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";
import UserCard from '../user/UserCard'

const userColWithCrud = () => [
  ...userColumns,
  {
    name: "Priority",
    cell: (row) => (
      <div>
        <p className={row?.roleManagement ? "text-green-400" : "text-red-400"}>
          {row.roleManagement ? "Role Management" : null}
        </p>
        
        <p className={row?.userStatus ? "text-green-400" : "text-red-400"}>
          {row?.userStatus ? "Status Management" : null}
        </p>
        {!row?.roleManagement && !row?.userStatus && (
          <p className="text-gray-400">Nill</p>
        )}
      </div>
    ),
    sortable: true,
  },
  {
    name: "Edit",
    cell: (row) => (
      <div className="w-full text-center">
        <EditUser id={row?.id} />
      </div>
    ),
  },
  {
    name: "Delete",
    cell: (row) => (
      <div className="w-full text-center">
        <DeleteUser id={row?.id} />
      </div>
    ),
  },
  {
    name: "Details",
    cell: (row) => (
      <div className="w-full text-center">
        <UserDetails id={row?.id} />
      </div>
    ),
  },
  {
    name: "Status",
    cell: (row) => (
      <div className="w-full text-center">
        <UserStatus id={row?.id} />
      </div>
    ),
  },
];

const ListUser = () => {
  const user = useSelector((store) => store.user.user);
  const searchQuery = useSelector((store) => store?.user?.searchQuery);
  const currentUser = fetchLocalStorageData();
  const dispatch = useDispatch();
  const tableData = user?.filter((item) => item?.name !== currentUser?.name);
  const search = tableData.filter((item) =>
    item?.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchRoles());
  },[dispatch]);

  const userData=search ? search : tableData

  return (
    <>
    <div className=" hidden lg:block py-6">
      <DataTable
        className="border border-gray-300"
        columns={userColWithCrud()}
        data={search ? search : tableData}
        pagination
        highlightOnHover
        striped
        customStyles={{
          headCells: {
            style: {
              borderBottom: "1px solid #ccc",
              textAlign: "center",
              fontWeight: "bold",
              verticalAlign: "middle",
            },
          },
          cells: {
            style: {
              borderRight: "1px solid #ccc",
              borderBottom: "1px solid #ccc",
              textAlign: "center",
            },
          },
        }}
      />
    </div>

    <div className="block lg:hidden">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {
          userData?.map((item)=>(
<UserCard key={item?.id} id={item?.id} userName={item?.name} email={item?.email} role={item?.role}/>
          ))
        }
      
     
      </div>
      
      
    </div>

    </>
  );
};

export default ListUser;
