import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import { validationSchema } from "../../../schema/RoleSchema";
import { ThreeDot } from "react-loading-indicators";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchRoles, addRole } from "../../../utils/api/rolesApi";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";

export function CreateRole() {
  const [openModal, setOpenModal] = useState(false);
  const [errorMesssage, setErrorMessage] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const emailInputRef = useRef(null);

  const dispatch = useDispatch();


  const { roles, loading, error } = useSelector((store) => store.roles);
  const { user } = useSelector((store) => store?.user);

  useEffect(() => {
    dispatch(fetchRoles());
  }, [dispatch]);

  useEffect(() => {
    const logedUser = fetchLocalStorageData();
    const data = user.find((user) => user?.name === logedUser.name);
    setCurrentUser(data);
  }, [user]);

  const formik = useFormik({
    initialValues: {
      role: "",
      create: false,
      read: false,
      update: false,
      remove: false,
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        const { role } = values;

        const permissions = Object.keys(values).filter(
          (key) => values[key] === true
        );

        const roleData = {
          role,
          permissions,
          createdAt: new Date(),
          createdUser: currentUser?.name,
        };
        const isRoleExist = roles.some(
          (r) => r.role.toLowerCase() === role.toLowerCase()
        );

        if (isRoleExist) {
          throw new Error(`${role} is already exist.try to add another role`);
        } else {
          const result = await dispatch(addRole(roleData));

          const { status } = result.payload;
          if (status >= 200 && status < 300) {
            resetForm();
            setOpenModal(false);
            toast.success("Role has been added successfully!", {
              className: "bg-green-300 text-white",
              duration: 3000,
            });
            setErrorMessage(null);
          }
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  const handelModal = () => {

    const loggeduser=fetchLocalStorageData()

    setOpenModal(true);
  };

  return (
    <>
      <Button
        disabled={currentUser && !currentUser.roleManagement}
        onClick={() => handelModal()}
        className=" w-full md:w-auto bg-primary "
      >
        Create Role
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
              Create a Role{" "}
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="text" value="Role" />
              </div>
              <TextInput
                id="text"
                name="role"
                value={formik.values.role}
                ref={emailInputRef}
                placeholder="admin"
                onChange={formik.handleChange}
              />
              {formik.errors.role && formik.touched.role && (
                <div className="text-red-400 text-sm font-light">
                  {formik.errors.role}
                </div>
              )}
            </div>

            <p className="text-sm">
              Choose Permissions <span className="text-red-400">*</span>
            </p>
            <div className="flex justify-between flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="create"
                  checked={formik.values.create}
                  onChange={formik.handleChange}
                />
                <Label htmlFor="remember">Create</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="read"
                  checked={formik.values.read}
                  onChange={formik.handleChange}
                  required
                />
                <Label htmlFor="remember">Read</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="update"
                  checked={formik.values.update}
                  onChange={formik.handleChange}
                />
                <Label htmlFor="remember">Update</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  name="remove"
                  checked={formik.values.remove}
                  onChange={formik.handleChange}
                />
                <Label htmlFor="remember">Delete</Label>
              </div>
            </div>
            {formik.errors["at-least-one-checkbox"] && formik.touched && (
              <p className="text-red-500 text-sm mt-2">
                {formik.errors["at-least-one-checkbox"]}
              </p>
            )}
            {errorMesssage && (
              <p className="text-red-400 font-light text-sm">{errorMesssage}</p>
            )}
            {error && (
              <p className="text-red-400 font-light text-sm">{error}</p>
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
                  "Create Role"
                )}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CreateRole;
