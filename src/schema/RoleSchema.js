import * as Yup from "yup";

export const validationSchema = Yup.object({
  role: Yup.string()
    .required("Role is required")
    .matches(
      /^[a-zA-Z]+$/,
      "Role must only contain letters (no spaces, numbers, or special characters)"
    ),
  create: Yup.boolean(),
  read: Yup.boolean(),
  update: Yup.boolean(),
  remove: Yup.boolean(),
}).test(
  "at-least-one-checkbox",
  "At least one checkbox must be selected",
  (values) => {
    return values.create || values.read || values.update || values.remove;
  }
);