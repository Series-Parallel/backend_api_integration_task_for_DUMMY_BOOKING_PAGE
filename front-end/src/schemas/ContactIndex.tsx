import * as yup from "yup";

export const contactSchema = yup.object().shape({
  firstName: yup.string().required("First Name is required"),
  lastName: yup.string().required("Last name is required"),
  code: yup.string().required("Enter Country Code"),
  email: yup
    .string()
    .required("Enter valid email")
    .email("Please enter a valid email"),
  phone: yup
    .string()
    .required("Enter a valid phone number")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .length(10, "Phone number must be exactly 10 digits"),
  eFirstName: yup.string().notRequired(),
  eLastName: yup.string().notRequired(),
  ephone: yup
    .string()
    .notRequired()
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
    .length(10, "Phone number must be exactly 10 digits"),
  ecode: yup.string().notRequired(),
});
