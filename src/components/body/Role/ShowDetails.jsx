import { Modal} from "flowbite-react";
import { useState } from "react";
import { useSelector } from "react-redux";

export function ShowDetails({ id }) {
  const { roles } = useSelector((store) => store.roles);
  const [openModal, setOpenModal] = useState(false);
  const [roleDetails, setRoleDetail] = useState(null);

  const handelClick = () => {
    const result = roles.find((item) => item?.id === id);
    setRoleDetail(result);
    console.log(result);

    setOpenModal(true);
  };

  const createdAtDate = new Date(roleDetails?.createdAt);

  const formattedDate = createdAtDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <button
        onClick={() => handelClick()}
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
    <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
      {roleDetails?.role.toUpperCase()}
    </h3>
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        Created By
      </h2>
      <p className="text-xl font-bold text-gray-900 dark:text-white">
        {roleDetails?.createdUser.toUpperCase()}
      </p>
    </div>
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        Created At
      </h2>
      <p className="text-xl font-bold text-gray-900 dark:text-white">
        {formattedDate}
      </p>
    </div>
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
        Permissions
      </h2>
      <ul className="list-disc list-inside">
        {roleDetails?.permissions.map((item, index) => (
          <li
            key={index}
            className="text-md font-semibold text-gray-700 dark:text-gray-300"
          >
            {item.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
    <button className="w-full bg-primary p-2 rounded-lg text-white shadow-xl" onClick={()=>setOpenModal(false)}>Close</button>
  </div>

  
</Modal.Body>

      </Modal>
    </>
  );
}
export default ShowDetails;
