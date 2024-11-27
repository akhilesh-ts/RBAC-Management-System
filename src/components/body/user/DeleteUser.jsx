import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser } from "../../../utils/api/userApi";
import { useEffect, useState } from "react";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";

const DeleteUser = ({ id }) => {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState(null);
  const [currentRole, setCurrentRole] = useState(null);
  const { user } = useSelector((store) => store.user);
  const { roles } = useSelector((store) => store.roles);


  useEffect(() => {
    const logedUser = fetchLocalStorageData();
    const data = user.find((u) => u?.name === logedUser.name);
    setCurrentUser(data);
  }, [user]);
  
  useEffect(() => {
    const currentRole = roles.find((item) => item?.role === currentUser?.role);
    setCurrentRole(currentRole?.permissions);
  }, [roles, currentUser]);


  

  const handelDelete = () => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "bg-green-400 px-4 py-2 text-white rounded-lg ml-4",
        cancelButton: "bg-red-400 px-4 py-2 text-white rounded-lg ml-4",
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: `You won't be able to revert user!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: `user has been deleted.`,
            icon: "success",
          });

          dispatch(deleteUser(id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your Role is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <>
      <button
        // className="bg-red-400 py-1 px-5 text-white rounded-lg font-medium"
        className={`py-1 px-5 rounded-lg font-medium  text-white ${
          currentRole&&!currentRole?.includes('remove') ? "cursor-not-allowed bg-red-300" : "bg-red-400"
        }`}
        onClick={() => handelDelete()}
        disabled={currentRole&&!currentRole?.includes('remove')}
      >
        Delete
      </button>
    </>
  );
};

export default DeleteUser;
