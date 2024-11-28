import { Avatar, Dropdown } from "flowbite-react";

import { useNavigate } from "react-router-dom";

const AvatarDropDown = () => {
  const navigate = useNavigate();

  const handelLogout = () => {
    localStorage.removeItem("logedinUser");
    navigate("/");
  };
  return (
    <>
      <Dropdown
        label={<Avatar alt="User settings" rounded />}
        arrowIcon={false}
        inline
      >
        <Dropdown.Item onClick={()=>navigate('/rbac/profile')}>Profile</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item onClick={() => handelLogout()}>Sign out</Dropdown.Item>
      </Dropdown>
    </>
  );
};

export default AvatarDropDown;
