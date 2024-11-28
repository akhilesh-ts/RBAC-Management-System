import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { ThreeDot } from "react-loading-indicators";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUser } from "../../../utils/api/userApi";
import { userValidation } from "../../../schema/userSchema";
import { toast } from "sonner";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";

const CreateUser = () => {
  const [openModal, setOpenModal] = useState(false);
  const [errorMesssage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);
  const [role, setRole] = useState(null);
  const emailInputRef = useRef(null);
  const dispatch = useDispatch();

  const roles = useSelector((store) => store.roles.roles); 
  const { error, loading, user } = useSelector((store) => store.user);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    const logedUser = fetchLocalStorageData();
    const data = user?.find((u) => u?.name === logedUser?.name);
    setCurrentUser(data);
  }, [user]);


  useEffect(() => {
    const userRole = roles.find(
      (item) => item?.role === currentUser?.role
    );
    setCurrentUserRole(userRole?.permissions);
  },[role]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      role: "",
      roleManagement: false,
      userStatus:false
    },
    validationSchema: userValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        const users = {
          ...values,
          createdAt: new Date(),
          createdBy: currentUser?.name,
          status: true,
        };
        const isUserExist = user.some(
          (item) =>
            item?.name.toLowerCase() === formik.values.name.toLowerCase()
        );
        if (isUserExist) {
          throw new Error(
            `${formik.values.name} is already exist .try another`
          );
        } else {
          const result = await dispatch(addUser(users));
          const { status } = result.payload;
          if (status >= 200 && status < 300) {
            setOpenModal(false);
            resetForm();
            toast.success("user has been added successfully!", {
              className: "bg-green-300 text-white",
              duration: 3000,
            });
            setErrorMessage("");
          }
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  useEffect(() => {
    const rolePermission = roles
      .find((item) => item.role === formik.values.role)  
    setRole(rolePermission?.permissions);
  }, [formik.values.role, roles]);

  return (
    <>
      <Button onClick={() => setOpenModal(true)}  disabled={currentUserRole&& !currentUserRole.includes('create')} className=" w-full md:w-auto bg-primary " >
        Create user
      </Button>
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
              Create user
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
                <option selected>Choose Role</option>
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
              {role&&role.length >= 4 ? (
                <>
                  <div className="flex gap-4 items-center ">
                    <Checkbox
                      checked={formik.values.roleManagement}
                      onChange={formik.handleChange}
                      name="roleManagement"
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
                  "Create User"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreateUser;
