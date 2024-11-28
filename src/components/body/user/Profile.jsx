import React, { useEffect, useState } from "react";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles } from "../../../utils/api/rolesApi";
import DetailCard from "./DetailCard";
import EditUser from "./EditUser";
import { fetchUser } from "../../../utils/api/userApi";

const Profile = () => {
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch();

  const { roles } = useSelector((store) => store.roles);
  const { user } = useSelector((store) => store.user);

  const userRoles = roles.find((role) => role?.role === userData?.role);

  useEffect(() => {
    dispatch(fetchRoles());
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const response = fetchLocalStorageData();
    const currentUser = user?.find((item) => item?.id === response?.id);
    setUserData(currentUser);
  }, [user]);

  return (
    <div className="max-w-5xl mx-auto mt-12 p-8 bg-white shadow-lg rounded-lg">
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 mt-4">
          {userData?.name}
        </h2>
        <p className="text-gray-500">{userData?.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DetailCard
          icon="M12 1.5A5.5 5.5 0 016.5 7H3a3 3 0 00-3 3v4a3 3 0 003 3h18a3 3 0 003-3v-4a3 3 0 00-3-3h-3.5A5.5 5.5 0 0112 1.5zm0 15.5c-2.3 0-4.158.93-5.295 2.373A2.998 2.998 0 009 21h6a2.998 2.998 0 002.295-1.127C16.158 17.93 14.3 17 12 17z"
          title="Role"
          value={userData?.role}
        />

        <DetailCard
          icon="M16 9V5a4 4 0 10-8 0v4a2 2 0 01-2 2v9a2 2 0 002 2h8a2 2 0 002-2v-9a2 2 0 01-2-2z"
          title="Account Status"
          value={userData?.status ? "Active" : "Inactive"}
        />
        <DetailCard
          icon="M16 9V5a4 4 0 10-8 0v4a2 2 0 01-2 2v9a2 2 0 002 2h8a2 2 0 002-2v-9a2 2 0 01-2-2z"
          title="UserStatus Management"
          value={userData?.userStatus ? "Enabled" : "Disabled"}
        />

        <DetailCard
          icon="M8 9a3 3 0 11-6 0 3 3 0 016 0zm7-6a3 3 0 100 6 3 3 0 000-6zm7 9a3 3 0 11-6 0 3 3 0 016 0z"
          title="Role Management"
          value={userData?.roleManagement ? "Enabled" : "Disabled"}
        />

        {/* <DetailCard
          icon="M17 8a4 4 0 00-8 0 4 4 0 100 8h6a4 4 0 102-8z"
          title="User Management"
          value={userData?.userManagement ? "Enabled" : "Disabled"}
        /> */}

        <DetailCard
          icon="M5 4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2H5z"
          title="Created At"
          value={
            userData?.createdAt
              ? new Date(userData?.createdAt).toLocaleDateString()
              : "N/A"
          }
        />

        <DetailCard
          icon="M4.293 8.293a1 1 0 011.414 0L12 14.586l6.293-6.293a1 1 0 111.414 1.414L12 17.414l-7.707-7.707a1 1 0 010-1.414z"
          title="Created By"
          value={userData?.createdBy}
        />
      </div>

      <div className="mt-10">
      
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Permissions</h3>
     

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userRoles?.permissions?.map((permission, index) => (
            <div
              key={index}
              className="flex items-center gap-4 bg-gray-50 border rounded-lg p-4 shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4 4h16v16H4z" />
              </svg>
              <p className="text-gray-800">{permission}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 w-full bg-dim text-white py-3 px-6 rounded-lg font-medium text-center">
        <EditUser id={userData?.id} width={"w-full"} />
      </div>
    </div>
  );
};

export default Profile;
