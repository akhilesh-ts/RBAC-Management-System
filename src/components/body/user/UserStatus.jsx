import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { changeStatus } from "../../../utils/api/userApi";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";

const UserStatus = ({ id }) => {
    const { user } = useSelector((store) => store.user);
  const [userData, setUserData] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch=useDispatch()

  useEffect(() => {
    const logedUser = fetchLocalStorageData();
    const data = user?.find((u) => u?.name === logedUser?.name);
    setCurrentUser(data);
  }, [user]);

  useEffect(() => {
    const response = user?.find((item) => item?.id === id);
    setUserData(response);
    
  }, [id, user]);

  const handelOpenModal = () => {
    Swal.fire({
      title: `Do you want to ${
        userData?.status ? "Deactivated" : "Activate"
      }? the user`,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const updateUser = {
            ...userData,
            status: !userData.status,
          };

        dispatch(changeStatus(updateUser))
       
        Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  };

  return (
    <>
      <button
  onClick={() => handelOpenModal()}
  disabled={currentUser && currentUser.userStatus === false}
  className={`${
    currentUser?.userStatus
      ? "bg-green-400 " 
      : userData?.status
      ? "bg-green-300 cursor-not-allowed" 
      : "bg-red-400"  
  } py-1 px-5 text-white rounded-lg font-medium`}
  
>
  {userData?.status ? "Activate" : "Deactivated"}
</button>
    </>
  );
};

export default UserStatus;
