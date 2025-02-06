import { useEffect, useState } from "react";
import { contactSchema } from "../schemas/ContactIndex";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setContactFormData } from "../store/form-slice";

interface ContactFormProps {
  onContactValidationChange: (isValid: boolean) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({
  onContactValidationChange,
}) => {
  const formik2 = useFormik({
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
  const isSubmitButtonClicked = useSelector(
    (state: RootState) => state.submitButton.isSubmitButtonClicked
  );
  const formData = useSelector(
    (state: RootState) => state.form.contactFormData
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const newIsValid =
      formik2.values.firstName.trim() !== "" &&
      formik2.values.lastName.trim() !== "" &&
      formik2.values.email.trim() !== "" &&
      formik2.values.code.trim() !== "" &&
      formik2.values.phone.trim() !== "";

    if (newIsValid !== isValid) {
      setIsValid(newIsValid);
      onContactValidationChange(newIsValid);
      dispatch(setContactFormData({ ...formik2.values }));
    }
    console.log(" Contact Form is valid", isValid);
  }, [
    formik2.values.firstName,
    formik2.values.lastName,
    formik2.values.email,
    formik2.values.code,
    formik2.values.phone,
    isValid,
  ]);

  // const dispatch = useDispatch();
  useEffect(() => {
    if (isSubmitButtonClicked) {
      console.log("Submitting form CF....");
      formik2.submitForm().then(() => {
        console.log("Submitting ContactForm..");
      });
    }
  }, [isSubmitButtonClicked]);

  console.log(formik2);
  console.log(formik2.errors);

  return (
    <div className="flex flex-col space-y-[20px] mb-[20px]">
      <div className="text-[35px] font-bold"> Contact</div>
      <div className="text-[20px]"> Booking contact</div>
      <form className="flex flex-col space-y-[10px]">
        <div className="flex flex-row space-x-[13px]">
          <input
            value={formik2.values.firstName}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="firstName"
            placeholder="First Name"
          />
          <input
            value={formik2.values.lastName}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row space-x-[13px]">
          <select
            value={formik2.values.code}
            onChange={formik2.handleChange}
            className="w-[126px] h-[56px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 "
            name="code"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
          </select>
          <input
            value={formik2.values.phone}
            name="phone"
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            placeholder="Phone Number"
            className="w-[371px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <input
          value={formik2.values.email}
          name="email"
          onChange={formik2.handleChange}
          onBlur={formik2.handleBlur}
          placeholder="Email"
          className="w-[510px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
        />
        <div className="text-[20px] mt-[10px] mb-[10px]">
          Emergency Contact (optional)
        </div>
        <div className="flex flex-row space-x-[13px]">
          <input
            value={formik2.values.eFirstName}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="firstName"
            placeholder="First Name"
          />
          <input
            value={formik2.values.eLastName}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row space-x-[13px]">
          <select
            value={formik2.values.ecode}
            onChange={formik2.handleChange}
            className="w-[126px] h-[56px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 "
            name="ecode"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
          </select>
          <input
            name="ephone"
            value={formik2.values.ephone}
            onChange={formik2.handleChange}
            onBlur={formik2.handleBlur}
            placeholder="Phone"
            className="w-[371px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
