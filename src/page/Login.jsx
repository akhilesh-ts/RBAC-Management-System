import { Button, Label, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import login from "../asset/login.jpg";
import { loginValidation } from "../schema/userSchema";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchUser } from "../utils/api/userApi";
import { toast } from "sonner";
import { ThreeDot } from "react-loading-indicators";
import { validateUserAuth } from "../utils/helper/validateUserAuth";

const Login = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [errorMesssage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      try {
        const isUser = user.find((user) => user.email === values.email);
        setIsLoading(true);

        const validate = validateUserAuth(isUser, values);

        if (validate) {
          toast.warning(validate, {
            className: "bg-red-400 text-white",
          });
          setIsLoading(false);

          setErrorMessage(validate);
        } else {
          toast.success("successfully loged!", {
            className: "bg-green-400 text-white",
          });
          localStorage.setItem('logedinUser',JSON.stringify(isUser))
      
          setIsLoading(false);
          setErrorMessage("");
          navigate("/rbac");
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="hidden lg:flex w-1/2 bg-cover bg-center">
          <img
            src={login}
            alt="Sample"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="mb-6 text-3xl font-semibold text-center text-gray-700">
            RBAC
          </h2>
          <form onSubmit={formik.handleSubmit} className="py-3">
            <div className="mb-4">
              <Label htmlFor="email" value="Email" />
              <TextInput
                id="email"
                type="email"
                placeholder="name@example.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.errors.email &&
                  formik.touched.email && (
                    <span className="text-red-600">{formik.errors.email}</span>
                  )
                }
              />
            </div>

            <div className="mb-4">
              <Label htmlFor="password" value="Password" />
              <TextInput
                id="password"
                type="password"
                placeholder="••••••••"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                helperText={
                  formik.errors.password &&
                  formik.touched.password && (
                    <span className="text-red-600">
                      {formik.errors.password}
                    </span>
                  )
                }
              />
            </div>
            {errorMesssage && (
              <p className="text-red-400 text-sm py-3">{errorMesssage}</p>
            )}
            <Button type="submit" className="w-full bg-primary">
              {isLoading ? (
                <ThreeDot color="#FFFFFF" size="medium" text="" textColor="" />
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
