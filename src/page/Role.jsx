import { useSelector } from "react-redux";
import CreateRole from "../components/body/Role/CreateRole";
import ListRoles from "../components/body/Role/ListRoles";
import Search from "../components/body/search/Search";
import { addSearchQuery } from "../utils/slice/roleSlice";

const Role = () => {
  const searchVal = useSelector((store) => store.roles.searchQuery);
  return (
    <>
      <div className="w-full h-auto bg-white shadow-lg rounded-lg p-10">
        <h1 className="text-xl font-bold mb-10">Role Management</h1>
        <div className="w-full md:flex items-center justify-between">
          <Search searchVal={searchVal} query={addSearchQuery} />
          <CreateRole />
        </div>
        <div className="w-full  ">
          <ListRoles  />
        </div>
      </div>
    </>
  );
};

export default Role;
