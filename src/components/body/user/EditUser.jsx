import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { ThreeDot } from "react-loading-indicators";
import { userValidation } from "../../../schema/userSchema";
import { editUser } from "../../../utils/api/userApi";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";

const EditUser = ({ id, width }) => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMesssage, setErrorMessage] = useState("");
  const [role, setRole] = useState(null);
  const [permissionCheckUser, setpermissionCheckUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const emailInputRef = useRef(null);

  const { roles } = useSelector((store) => store.roles);
  const { loading, error, user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const logedUser = fetchLocalStorageData();
    const data = user?.find((u) => u?.name === logedUser?.name);
    setpermissionCheckUser(data);
  }, [user]);

  useEffect(() => {
    const userRole = roles.find(
      (item) => item?.role === permissionCheckUser?.role
    );
    setCurrentUserRole(userRole?.permissions);
  }, [currentUserRole,roles]);


  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      roleManagement: false,
      userStatus: false,
    },
    validationSchema: userValidation,
    onSubmit: async (value) => {
      try {
        const result = await dispatch(editUser(value));

        const { status } = result.payload;

        if (status >= 200 && status < 300) {
          setOpenModal(false);
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });
  const handelOpenModal = () => {
    const editUser = user.find((item) => item?.id === id);
    setCurrentUser(editUser);
    setOpenModal(true);
  };

  useEffect(() => {
    if (currentUser) {
      formik.setValues(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    const rolePermission = roles.find(
      (item) => item.role === formik.values.role
    );

    setRole(rolePermission?.permissions);
  }, [formik.values.role, roles]);

  useEffect(() => {
    if (role && role.length < 4) {
      formik.setFieldValue("roleManagement", false);
      formik.setFieldValue("userManagement", false);
    }
  }, [role]);

  return (
    <>
      <button
        onClick={() => handelOpenModal()}
        disabled={currentUserRole && !currentUserRole.includes("update")}
        className={`py-1 px-5 rounded-lg font-medium text-white "bg-primary" ${
          width ? width : ""
        } ${
          currentUserRole && !currentUserRole?.includes("update")
            ? "cursor-not-allowed bg-dim"
            : "bg-primary"
        }`}
      >
        Edit
      </button>
      <Modal
        show={openModal}
        size="md"
        popup
        onClose={() => setOpenModal(false)}
        initialFocus={emailInputRef}
      >
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <h3 className="text-xl text-center font-medium text-gray-900 dark:text-white">
              Edit User
            </h3>
            <div className="flex flex-col gap-5">
              <div>
                <TextInput
                  name="name"
                  value={formik.values.name}
                  ref={emailInputRef}
                  placeholder="Enter username..."
                  onChange={formik.handleChange}
                />
                {formik.touched.name && formik.errors.name ? (
                  <p className="text-red-400 font-normal text-sm">
                    {formik.errors.name}
                  </p>
                ) : null}
              </div>
              <div>
                <TextInput
                  type="email"
                  name="email"
                  value={formik.values.email}
                  placeholder="Enter Email..."
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <p className="text-red-400 font-normal text-sm">
                    {formik.errors.email}
                  </p>
                ) : null}
              </div>
              <div>
                <TextInput
                  type="password"
                  name="password"
                  value={formik.values.password}
                  placeholder="Enter Password..."
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <p className="text-red-400 font-normal text-sm">
                    {formik.errors.password}
                  </p>
                ) : null}
              </div>
              <select
                name="role"
                value={formik.values.role}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg "
                onChange={formik.handleChange}
              >
                {roles?.map((item) => (
                  <option value={item.value} key={item?.role}>
                    {item?.role}
                  </option>
                ))}
              </select>
              {formik.touched.role && formik.errors.role ? (
                <p className="text-red-400 font-normal text-sm">
                  {formik.errors.role}
                </p>
              ) : null}

              <div className="flex gap-4 items-center ">
                <Checkbox
                  checked={formik.values.userStatus}
                  onChange={formik.handleChange}
                  name="userStatus"
                />
                <Label htmlFor="remember" className=" text-red-400 font-medium">
                  user Status manage (Optional)
                </Label>
              </div>
              {role && role.length >= 4 ? (
                <>
                  <div className="flex gap-4 items-center ">
                    <Checkbox
                      checked={formik.values.roleManagement}
                      onChange={formik.handleChange}
                      name="roleManagement"
                      id="remember"
                    />
                    <Label
                      htmlFor="remember"
                      className=" text-red-400 font-medium"
                    >
                      Enable Role management (Optional)
                    </Label>
                  </div>
                </>
              ) : null}
            </div>
            {errorMesssage && (
              <p className="text-red-400 text-sm font-normal">
                {errorMesssage}
              </p>
            )}
            {error && (
              <p className="text-red-400 text-sm font-normal">{error}</p>
            )}
            <div className="w-full  bg-primary rounded-lg">
              <Button type="submit" className="w-full">
                {loading ? (
                  <ThreeDot
                    color="#FFFFFF"
                    size="medium"
                    text=""
                    textColor=""
                  />
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditUser;
