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

  /* optional fields*/
  mask: yup.boolean().oneOf([true, false]).notRequired(),
  snorkel: yup.boolean().oneOf([true, false]).notRequired(),
  fins: yup.boolean().oneOf([true, false]).notRequired(),
  boots: yup.boolean().oneOf([true, false]).notRequired(),
  bcd: yup.boolean().oneOf([true, false]).notRequired(),
  wetsuit: yup.boolean().oneOf([true, false]).notRequired(),
  regulator: yup.boolean().oneOf([true, false]).notRequired(),
});
