import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { deleteRole } from "../../../utils/api/rolesApi";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";
import { useEffect, useState } from "react";

const DeleteRole = ({ id }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const { roles } = useSelector((store) => store.roles);

  useEffect(() => {
    const logedUser = fetchLocalStorageData();
    const data = user.find((u) => u?.name === logedUser.name);
    setCurrentUser(data);
  }, [user]);

  const handelDelete = () => {
    const isRole = roles.find((role) => role?.id === id);
    const isUser = user.find((item) => item?.role === isRole?.role);

    if (isUser) {
      // Show a message if the role is assigned to a user
      Swal.fire({
        title: "Cannot Delete Role",
        text: "This role is assigned to a user, so it cannot be deleted.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Exit the function early
    }

    // SweetAlert2 dialog for confirmation
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
        text: `You won't be able to revert this action!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          // Proceed with deletion
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: `Role has been deleted.`,
            icon: "success",
          });

          dispatch(deleteRole(id));
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Cancellation message
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your role is safe :)",
            icon: "error",
          });
        }
      });
  };

  return (
    <button
     disabled={currentUser && !currentUser.roleManagement}
      
      className={`py-1 px-5 rounded-lg font-medium  text-white ${
        currentUser && !currentUser.roleManagement ? "cursor-not-allowed bg-red-300" : "bg-red-400"
      }`}
      onClick={() => handelDelete()}
    >
      Delete
    </button>
  );
};

export default DeleteRole;
