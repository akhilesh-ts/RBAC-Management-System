import { Modal } from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Role from "../../../utils/svg/Role";
import Management from "../../../utils/svg/Management";
import Email from "../../../utils/svg/Email";

export function UserDetails({ id }) {
  const [openModal, setOpenModal] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userPermission, setUserPermission] = useState(null);
  const user = useSelector((store) => store.user.user);
  const role = useSelector((store) => store.roles.roles);

  const handelOpen = () => {
    const response = user.find((item) => item?.id === id);
    const userRole = role.find((item) => item.role === response.role);

    setUserPermission(userRole?.permissions);
    setUserData(response);
    setOpenModal(true);
  };

  return (
    <>
      <button
        onClick={() => handelOpen()}
        className="bg-green-400 py-1 px-5 text-white rounded-lg font-medium"
      >
        Details
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-800">
                {userData?.name.toUpperCase()}
              </h3>
              <p className="text-sm text-gray-500">Information Overview</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <Email />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="text-lg text-gray-900">{userData?.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <Role />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Role</p>
                  <p className="text-lg text-gray-900">{userData?.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-yellow-100 p-2 rounded-full">
                  <Management />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Priority</p>
                  <p className="text-lg text-gray-900">
                    {userData?.roleManagement ? "Role Management" : "Nill"}
                  </p>
                </div>
              </div>
            </div>

            {userPermission && userPermission.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                  Permissions
                </h4>
                <ul className="list-disc list-inside text-gray-900">
                  {userPermission.map((item, index) => (
                    <li key={index} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {
              userData?.roleManagement || userData?.userManagement || userData?.userStatus ?(
                <div className="bg-gray-50 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-700 mb-2">
                Priority
                </h4>
                <ul className="list-disc list-inside text-gray-900">
                  {
                    userData?.roleManagement ? <li  className="text-sm">
                      RoleManagement
                    </li> :null
                  }
                  {
                    userData?.userManagement ? <li  className="text-sm">
                      UserManagement
                    </li> :null
                  }
                  {
                    userData?.userStatus ? <li  className="text-sm">
                      ManageuserStatus
                    </li> :null
                  }
                    
                  
                </ul>
              </div>

              ):null
            }
            
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserDetails;
