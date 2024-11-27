import { Button, Checkbox, Label, Modal, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { fetchLocalStorageData } from "../../../utils/helper/fetchLocalStorageData";
import { editRole } from "../../../utils/api/rolesApi";
import { ThreeDot } from "react-loading-indicators";

export const EditRole = ({ id }) => {
  const [openModal, setOpenModal] = useState(false);
  const { roles } = useSelector((store) => store.roles);
  const { user } = useSelector((store) => store?.user);
  const [isLoading,setIsLoading]=useState(false)
  const [currentUser, setCurrentUser] = useState(null);
  const [roleData, setRoleData] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const logedUser = fetchLocalStorageData();
    const data = user.find((u) => u?.name === logedUser.name);
    setCurrentUser(data);
  }, [user]);

  const handelModal = () => {
    const result = roles.find((item) => item?.id === id);
    setRoleData(result);
    setOpenModal(true);
  };

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const formik = useFormik({
    initialValues: {
      role: "",
      permissions: [],
    },
    onSubmit: async (values) => {
      setIsLoading(true)
      const editData = {
        id: roleData?.id,
        role: values?.role,
        permissions: values.permissions,
        createdAt: roleData?.createdAt,
        createdUser: roleData?.createdUser,
      };

      const result = await dispatch(editRole(editData));

      const { status } = result.payload;

      if (status >= 200 && status < 300) {
        setIsLoading(false)
        setOpenModal(false);
      }
    },
  });
  useEffect(() => {
    if (roleData) {
      formik.setValues({
        role: roleData?.role,
        permissions: roleData?.permissions,
      });
    }
  }, [roleData]);

  const permissionOptions = ["read", "create", "remove", "update"];

  return (
    <>
      <button
        onClick={handelModal}
        disabled={currentUser && !currentUser.roleManagement}
        className={`py-1 px-5 rounded-lg font-medium  text-white ${
          currentUser && !currentUser.roleManagement ? "cursor-not-allowed bg-dim" : "bg-primary"
        }`}
      >
        Edit
      </button>

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <h3 className="text-xl font-medium text-gray-900 dark:text-white text-center">
              Edit Role
            </h3>

            <div>
              <div className="mb-2 block">
                <Label htmlFor="role" value="Role" />
              </div>
              <TextInput
                id="role"
                name="role"
                placeholder="Role"
                value={formik.values.role}
                onChange={formik.handleChange}
                required
              />
            </div>

            <p className="text-sm">
              Choose Permissions <span className="text-red-400">*</span>
            </p>
            <div className="flex justify-between flex-wrap gap-4">
              {permissionOptions.map((permission) => (
                <div key={permission} className="flex items-center gap-2">
                  <Checkbox
                    id={permission}
                    name="permissions"
                    value={permission}
                    checked={formik?.values?.permissions?.includes(permission)}
                    onChange={(e) => {
                      const { checked, value } = e.target;

                      if (checked) {
                        formik.setFieldValue("permissions", [
                          ...formik?.values?.permissions,
                          value,
                        ]);
                      } else {
                        formik.setFieldValue(
                          "permissions",
                          formik.values.permissions.filter(
                            (perm) => perm !== value
                          )
                        );
                      }
                    }}
                  />
                  <Label htmlFor={permission}>{permission}</Label>
                </div>
              ))}
            </div>

            <div className="w-full bg-primary rounded-lg">
              <Button type="submit" className="w-full bg-primary">
                {
                  isLoading ?  <ThreeDot
                  color="#FFFFFF"
                  size="medium"
                  text=""
                  textColor=""
                /> : 'Submit'
                }
             
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditRole;
