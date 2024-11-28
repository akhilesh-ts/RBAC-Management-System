import {  Modal } from "flowbite-react";
import { useState } from "react";

 const PermissionDenyModal=({ onClose })=> {
  const [openModal, setOpenModal] = useState(true);

  return (
    <>
      
      <Modal
        show={true}
        onClose={onClose}
        size="md"
        popup
       
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <p>You do not have permission to manage roles as this task is not assigned to you</p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PermissionDenyModal