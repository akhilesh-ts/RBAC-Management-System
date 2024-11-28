import React, { useEffect } from "react";
import DataTable from "react-data-table-component";
import { roleColumns } from "../../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../utils/api/rolesApi";
import EditRole from "./EditRole";
import DeleteRole from "./DeleteRole";
import ShowDetails from "./ShowDetails";
import { deleteRole } from "../../../utils/api/rolesApi";
import RoleCard from "./RoleCard";

const roleColumnwithAction = () => [
  ...roleColumns,
  {
    name: "Permissions",
    cell: (row) => (
      <div className="flex flex-wrap gap-1">
       
        {["read", "create", "remove", "update"].map((perm) => (
          <span
            key={perm}
            className={`px-2 py-1 text-xs font-medium rounded-full ${
              (row?.permissions)?.includes(perm)
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {perm}
          </span>
        ))}
      </div>
    ),
  },
  {
    name: "Edit",
    cell: (row) => (
      <div className="w-full text-center">
        <EditRole id={row?.id} />
      </div>
    ),
  },
  {
    name: "Delete",
    cell: (row) => (
      <div className="w-full text-center">
        <DeleteRole remove={deleteRole} name={"Role"} id={row?.id} />
      </div>
    ),
  },
  {
    name: "Details",
    cell: (row) => (
      <div className="w-full text-center">
        <ShowDetails id={row?.id} />
      </div>
    ),
  },
];

const ListRoles = () => {
  const dispatch = useDispatch();
  const { searchQuery, roles } = useSelector((store) => store.roles);

  const filteredRoles = roles.filter((roles) =>
    roles?.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  const dataToMap = filteredRoles ? filteredRoles : roles;
 
  return (
    <>
      <div className=" hidden md:block py-6">
        <DataTable
          className="border border-gray-300"
          columns={roleColumnwithAction()}
          data={filteredRoles ? filteredRoles : roles}
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
 <div className="block md:hidden mt-10 ">
 {
        dataToMap.map((item)=>(
           <RoleCard key={item?.id} id={item?.id} role={item?.role} permissions={item?.permissions} />
        ))
      }
 </div>
      

    </>
  );
};

export default ListRoles;
