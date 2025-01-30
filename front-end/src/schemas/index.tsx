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
});
