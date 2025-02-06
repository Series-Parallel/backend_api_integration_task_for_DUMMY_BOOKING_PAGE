import { useEffect, useState } from "react";
import { useFormik } from "formik";
import down from "../assets/down-arrow.png";
import { schema } from "../schemas";
import ExtraForm from "./ExtraForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setMainFormData } from "../store/form-slice";

interface FormProps {
  onShowChange: (show: boolean) => void;
  showsForm: boolean;
  onFormValidChange: (index: number, valid: boolean) => void;
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
  onParticipantNameChange,
  participantIndex,
}) => {
  const formik1 = useFormik({
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
  const [show, setShow] = useState<boolean>(false);
  const isSubmitButtonClicked = useSelector(
    (state: RootState) => state.submitButton.isSubmitButtonClicked
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const newIsValid =
      formik1.values.firstName.trim() !== "" &&
      formik1.values.lastName.trim() !== "" &&
      formik1.values.dateOfBirth.trim() !== "" &&
      formik1.values.gender.trim() !== "" &&
      formik1.values.proof === true &&
      formik1.values.notFlying === true &&
      formik1.values.notPregnant === true;

    if (newIsValid !== isValid) {
      setIsValid(newIsValid);
      onFormValidChange(participantIndex, newIsValid);
      dispatch(setMainFormData({ ...formik1.values }));
    }
    console.log("Form is valid", isValid);
  }, [
    formik1.values.firstName,
    formik1.values.lastName,
    formik1.values.dateOfBirth,
    formik1.values.gender,
    formik1.values.proof,
    formik1.values.notFlying,
    formik1.values.notPregnant,
    isValid,
  ]);

  useEffect(() => {
    if (
      isValid &&
      formik1.values.firstName.trim() !== "" &&
      formik1.values.lastName.trim() !== ""
    ) {
      onParticipantNameChange(
        participantIndex,
        formik1.values.firstName,
        formik1.values.lastName
      );
    }
  }, [isValid, formik1.values.firstName]);



  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newShow = !showsForm;
    setShow(newShow);
    onShowChange(newShow);
  };

  console.log("Formik error", formik1.errors);

  // const dispatch = useDispatch();
  useEffect(() => {
    if (isSubmitButtonClicked) {
      console.log("Submitting form F...");
      formik1.submitForm().then(() => {
        console.log("Main Form Submitted");
      });
    }
  }, [isSubmitButtonClicked]);

  return (
    <form className=" flex flex-col space-y-[10px]">
      <div className="flex flex-row space-x-[10px]">
        <div className="   flex flex-col ">
          <input
            type="text"
            name="firstName"
            value={formik1.values.firstName}
            onChange={formik1.handleChange}
            onBlur={formik1.handleBlur}
            placeholder="First Name"
            className="w-[221px] font-semibold h-[52px] pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
          {formik1.touched.firstName && formik1.errors.firstName && (
            <p className=" ml-[10px] text-red-400  text-[10px] h-[14px]">
              {formik1.errors.firstName}
            </p>
          )}
        </div>
        <div className="  flex flex-col  ">
          <input
            type="text"
            name="lastName"
            value={formik1.values.lastName}
            onChange={formik1.handleChange}
            onBlur={formik1.handleBlur}
            placeholder="Last Name"
            className="w-[227px] font-semibold h-[52px]  pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
          {formik1.touched.lastName && formik1.errors.lastName && (
            <p className="ml-[10px] text-red-400  text-[10px] h-[14px]">
              {formik1.errors.lastName}
            </p>
          )}
        </div>
      </div>
      <div className="  flex flex-col space-x-[10px]">
        <input
          type="text"
          name="dateOfBirth"
          value={formik1.values.dateOfBirth}
          onChange={formik1.handleChange}
          placeholder="Date of Birth"
          onFocus={(e) => (e.target.type = "date")}
          onBlur={(e) => (e.target.type = "text")}
          className="w-[459px] h-[56px] font-semibold pl-[10px] placeholder-gray-400 border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
        />
        {formik1.touched.dateOfBirth && formik1.errors.dateOfBirth && (
          <p className="ml-[10px] text-red-400 text-[10px]">
            {formik1.errors.dateOfBirth}
          </p>
        )}
      </div>
      {/* Styled Dropdown */}
      <div className="w-[459px]">
        <select
          name="gender"
          value={formik1.values.gender}
          onChange={formik1.handleChange}
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
            onChange={formik1.handleChange}
            onClick={() =>
              formik1.setFieldValue("proof", !formik1.values.proof)
            }
          />
          <span>I can provide proof of certification</span>
        </label>

        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox"
            name="notFlying"
            onChange={formik1.handleChange}
            onClick={() =>
              formik1.setFieldValue("notFlying", !formik1.values.notFlying)
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
            onChange={formik1.handleChange}
            onClick={() =>
              formik1.setFieldValue("notPregnant", !formik1.values.notPregnant)
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
      {show && <ExtraForm formik={formik1} />}
      <div className="w-[459px] mt-[10px] border-1 border-gray-300 "></div>
    </form>
  );
};

export default Form;
