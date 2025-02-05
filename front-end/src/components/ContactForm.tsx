import { useEffect, useState } from "react";
import { contactSchema } from "../schemas/ContactIndex";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

interface ContactFormProps {
  onContactValidationChange: (isValid: boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onContactValidationChange,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      code: "",
      phone: "",
      eFirstName: "",
      eLastName: "",
      email: "",
      ecode: "",
      ephone: "",
    },
    onSubmit: (values) => {
      console.log("Contact Form Submitted", values);
    },
    validationSchema: contactSchema,
  });

  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    const newIsValid =
      formik.values.firstName.trim() !== "" &&
      formik.values.lastName.trim() !== "" &&
      formik.values.email.trim() !== "" &&
      formik.values.code.trim() !== "" &&
      formik.values.phone.trim() !== "";

    if (newIsValid !== isValid) {
      setIsValid(newIsValid);
      onContactValidationChange(newIsValid);
    }
    console.log(" Contact Form is valid", isValid);
  }, [
    formik.values.firstName,
    formik.values.lastName,
    formik.values.email,
    formik.values.code,
    formik.values.phone,
    isValid,
  ]);

  const dispatch = useDispatch();
  const isSubmitButtonClicked = useSelector(
    (state: RootState) => state.submitButton.isSubmitButtonClicked
  );
  useEffect(() => {
    if (isSubmitButtonClicked) {
      console.log("Submitting form CF....");
      formik.submitForm().then(() => {
        console.log("Submitting ContactForm..");
      });
    }
  }, [isSubmitButtonClicked, dispatch]);

  console.log(formik);
  console.log(formik.errors);

  return (
    <div className="flex flex-col space-y-[20px] mb-[20px]">
      <div className="text-[35px] font-bold"> Contact</div>
      <div className="text-[20px]"> Booking contact</div>
      <form className="flex flex-col space-y-[10px]">
        <div className="flex flex-row space-x-[13px]">
          <input
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="firstName"
            placeholder="First Name"
          />
          <input
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row space-x-[13px]">
          <select
            value={formik.values.code}
            onChange={formik.handleChange}
            className="w-[126px] h-[56px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 "
            name="code"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
          </select>
          <input
            value={formik.values.phone}
            name="phone"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Phone Number"
            className="w-[371px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <input
          value={formik.values.email}
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Email"
          className="w-[510px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
        />
        <div className="text-[20px] mt-[10px] mb-[10px]">
          Emergency Contact (optional)
        </div>
        <div className="flex flex-row space-x-[13px]">
          <input
            value={formik.values.eFirstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="firstName"
            placeholder="First Name"
          />
          <input
            value={formik.values.eLastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row space-x-[13px]">
          <select
            value={formik.values.ecode}
            onChange={formik.handleChange}
            className="w-[126px] h-[56px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 "
            name="ecode"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
          </select>
          <input
            name="ephone"
            value={formik.values.ephone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Phone"
            className="w-[371px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
