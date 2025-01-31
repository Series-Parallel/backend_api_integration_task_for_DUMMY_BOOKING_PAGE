import { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";

import down from "../assets/down-arrow.png";
import { schema } from "../schemas";
import ExtraForm from "./ExtraForm";

interface FormProps {
  onShowChange: (show: boolean) => void;
  showsForm: boolean;
  onFormValidChange: (index: number, valid: boolean) => void;
  isSubmitButtonClicked: boolean;
  onParticipantNameChange: (
    index: number,
    name: string,
    surname: string
  ) => void;
  participantIndex: number;
}

const Form: React.FC<FormProps> = ({
  onShowChange,
  showsForm,
  onFormValidChange,
  isSubmitButtonClicked,
  onParticipantNameChange,
  participantIndex,
}) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      gender: "",
      proof: false,
      notFlying: false,
      notPregnant: false,
      weight: 0,
      weightUnit: "",
      height: 0,
      heightUnit: "",
      shoeSizeType: "",
      shoeSize: 0,
      bodyType: "",
      mask: false,
      snorkel: false,
      fins: false,
      boots: false,
      bcd: false,
      wetsuit: false,
      regulator: false,
    },
    onSubmit: (values) => {
      console.log("Form Submitted", values);
    },
    validationSchema: schema,
  });

  const [isValid, setIsValid] = useState<boolean>(false);
  useEffect(() => {
    const newIsValid =
      formik.values.firstName.trim() !== "" &&
      formik.values.lastName.trim() !== "" &&
      formik.values.dateOfBirth.trim() !== "" &&
      formik.values.gender.trim() !== "" &&
      formik.values.proof === true &&
      formik.values.notFlying === true &&
      formik.values.notPregnant === true;

    if (newIsValid !== isValid) {
      setIsValid(newIsValid);
      onFormValidChange(participantIndex, newIsValid);
    }
    console.log("Form is valid", isValid);
  }, [
    formik.values.firstName,
    formik.values.lastName,
    formik.values.dateOfBirth,
    formik.values.gender,
    formik.values.proof,
    formik.values.notFlying,
    formik.values.notPregnant,
    isValid,
  ]);

  const hasSubmitted = useRef(false);
  useEffect(() => {
    if (isSubmitButtonClicked && !hasSubmitted.current) {
      formik.submitForm();
      hasSubmitted.current = true;
    }
  }, [isSubmitButtonClicked, formik]);

  useEffect(() => {
    if (
      isValid &&
      formik.values.firstName.trim() !== "" &&
      formik.values.lastName.trim() !== ""
    ) {
      onParticipantNameChange(
        participantIndex,
        formik.values.firstName,
        formik.values.lastName
      );
    }
  }, [isValid, formik.values.firstName]);

  console.log(formik);
  console.log(formik.errors);

  const [show, setShow] = useState<boolean>(false);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newShow = !showsForm;
    setShow(newShow);
    onShowChange(newShow);
  };

  console.log("Formik error", formik.errors);

  return (
    <form className=" flex flex-col space-y-[10px]">
      <div className="flex flex-row space-x-[10px]">
        <div className="   flex flex-col ">
          <input
            type="text"
            name="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="First Name"
            className="w-[221px] font-semibold h-[52px] pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
          {formik.touched.firstName && formik.errors.firstName && (
            <p className=" ml-[10px] text-red-400  text-[10px] h-[14px]">
              {formik.errors.firstName}
            </p>
          )}
        </div>
        <div className="  flex flex-col  ">
          <input
            type="text"
            name="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Last Name"
            className="w-[227px] font-semibold h-[52px]  pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
          {formik.touched.lastName && formik.errors.lastName && (
            <p className="ml-[10px] text-red-400  text-[10px] h-[14px]">
              {formik.errors.lastName}
            </p>
          )}
        </div>
      </div>
      <div className="  flex flex-col space-x-[10px]">
        <input
          type="text"
          name="dateOfBirth"
          value={formik.values.dateOfBirth}
          onChange={formik.handleChange}
          placeholder="Date of Birth"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          className="w-[459px] h-[56px] font-semibold pl-[10px] placeholder-gray-400 border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
        />
        {formik.touched.dateOfBirth && formik.errors.dateOfBirth && (
          <p className="ml-[10px] text-red-400 text-[10px]">
            {formik.errors.dateOfBirth}
          </p>
        )}
      </div>
      {/* Styled Dropdown */}
      <div className="w-[459px]">
        <select
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          aria-placeholder="Gender"
          className="w-full font-semibold h-[56px] pl-[10px] pr-[30px] border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
        >
          <option defaultValue="Gender" value="" disabled>
            Gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
      <div className="flex flex-col space-y-2">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            name="proof"
            onChange={formik.handleChange}
            onClick={() => formik.setFieldValue("proof", !formik.values.proof)}
          />
          <span>I can provide proof of certification</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            name="notFlying"
            onChange={formik.handleChange}
            onClick={() =>
              formik.setFieldValue("notFlying", !formik.values.notFlying)
            }
          />
          <span className="text-balance">
            I am not flying within 24 hours after diving (including <br />
            helicopters)
          </span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            name="notPregnant"
            onChange={formik.handleChange}
            onClick={() =>
              formik.setFieldValue("notPregnant", !formik.values.notPregnant)
            }
          />
          <span>I am not pregnant (scuba tours)</span>
        </label>
      </div>
      <div className="w-[459px] mt-[10px] border-1 border-gray-300 "></div>
      <div className="flex justify-between mt-[15px] mb-[15px] flex-row">
        <p className="font-semibold"> Participant needs gear</p>
        <button
          onClick={handleButtonClick}
          className={`w-[40px] h-[40px] mt-[5px] cursor-pointer rounded-[50px] ${
            show ? "bg-green-500" : "bg-gray-500"
          }`}
        >
          <img src={down} />
        </button>
      </div>

      {/* this one is optional */}
      {show && <ExtraForm formik={formik} />}
      <div className="w-[459px] mt-[10px] border-1 border-gray-300 "></div>
    </form>
  );
};

export default Form;
