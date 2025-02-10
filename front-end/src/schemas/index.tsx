import * as yup from "yup";

export const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dateOfBirth: yup.string().required("Date of birth is required"),
  gender: yup.string().oneOf(["Male", "Female"]).required("Gender is required"),
  proof: yup.boolean().oneOf([true]).required("This field should be checked!"),
  notFlying: yup
    .boolean()
    .oneOf([true])
    .required("This field should be checked!"),
  notPregnant: yup
    .boolean()
    .oneOf([true])
    .required("This field should be checked!"),
  needsGear: yup.boolean().oneOf([true, false]).required(),
  weight: yup.number().notRequired(),
  weightUnit: yup.string().oneOf(["kg", "lbs"]).notRequired(),
  height: yup.number().notRequired(),
  heightUnit: yup.string().oneOf(["cm", "ft in"]).notRequired(),
  shoeSizeType: yup
    .string()
    .oneOf(["EU", "US Men", "US Women", "UK"])
    .notRequired(),
  shoeSize: yup
    .number()
    .nullable()
    .transform((_, value) => (value === "" ? null : value))
    .notRequired(),
  bodyType: yup
    .string()
    .oneOf(["Slim", "Average", "Atheletic", "Heavy"])
    .notRequired(),
  country: yup.string().oneOf(["India", "United States"]).required(),

  /* optional fields*/
  mask: yup.boolean().oneOf([true, false]).notRequired(),
  snorkel: yup.boolean().oneOf([true, false]).notRequired(),
  fins: yup.boolean().oneOf([true, false]).notRequired(),
  boots: yup.boolean().oneOf([true, false]).notRequired(),
  bcd: yup.boolean().oneOf([true, false]).notRequired(),
  wetsuit: yup.boolean().oneOf([true, false]).notRequired(),
  regulator: yup.boolean().oneOf([true, false]).notRequired(),

  /* contact form details */
  cfirstName: yup.string().required("First Name is required"),
  clastName: yup.string().required("Last name is required"),
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
