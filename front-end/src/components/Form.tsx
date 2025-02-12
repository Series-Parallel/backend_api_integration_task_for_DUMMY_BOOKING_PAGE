import { useEffect, useState } from "react";
import { useFormik } from "formik";
import down from "../assets/down-arrow.png";
import { schema } from "../schemas";
import ExtraForm from "./ExtraForm";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setContactFormDataNew,
  setEmergencyContactNew,
  setIsDeclarationsProvided,
  setParticipantBodyMeasurements,
  setParticipantDiverDetails,
  // setParticipantGear,
  // setParticipantNeedsGear,
  setPersonalInfo,
} from "../store/newFinal-slice";
// import { setMainFormData } from "../store/form-slice";

interface FormProps {
  onShowChange?: (show: boolean) => void;
  showsForm?: boolean;
  onFormValidChange?: (index: number, valid: boolean) => void;
  onParticipantNameChange?: (
    index: number,
    name: string,
    surname: string
  ) => void;
  participantIndex?: number;
  onContactValidationChange?: (isValid: boolean) => void;
}

const Form: React.FC<FormProps> = ({
  onShowChange,
  showsForm,
  onFormValidChange,
  onParticipantNameChange,
  participantIndex,
  onContactValidationChange = () => {},
}) => {
  const formik = useFormik({
    enableReinitialize: false,
    initialValues: {
      firstName: "Deo",
      lastName: "Pathak",
      dateOfBirth: "11-09-2003",
      gender: "Male",
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
      needsGear: false,
      cfirstName: "Draven",
      clastName: "Noxus",
      code: "+1",
      phone: "9824169217",
      eFirstName: "",
      eLastName: "",
      email: "draven11@gmail.com",
      ecode: "",
      ephone: "",
      country: "United States",
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

  const step = useSelector((state: RootState) => state.step.step);

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
      if (onFormValidChange) {
        onFormValidChange(participantIndex ?? 0, newIsValid);
      }
      // dispatch(setMainFormData({ ...formik1.values }));
      dispatch(
        setPersonalInfo({
          index: participantIndex ?? 0,
          firstName: formik.values.firstName,
          lastName: formik.values.lastName,
          dob: formik.values.dateOfBirth,
          gender: formik.values.gender,
        })
      );
    }
    const declarations =
      formik.values.proof === true &&
      formik.values.notFlying === true &&
      formik.values.notPregnant === true;

    if (declarations) {
      dispatch(
        setIsDeclarationsProvided({
          index: participantIndex ?? 0,
          isDeclarationsProvided: true,
        })
      );
    }
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

  useEffect(() => {
    const participantGear = {
      mask: formik.values.mask,
      snorkel: formik.values.snorkel,
      fins: formik.values.fins,
      boots: formik.values.boots,
      bcd: formik.values.bcd,
      wetsuit: formik.values.wetsuit,
      regulator: formik.values.regulator,
    };

    const bodyMeasurements = {
      height: {
        height: formik.values.height || undefined,
        heightUnit: formik.values.heightUnit || undefined,
      },
      weight: {
        weight: formik.values.weight || undefined,
        weightUnit: formik.values.weightUnit || undefined,
      },
      shoeSize: formik.values.shoeSize || undefined,
      bodyType: formik.values.bodyType,
    };

    const needsGear = Object.values(participantGear).some((gear) => gear);

    dispatch(
      setParticipantDiverDetails({
        index: participantIndex ?? 0,
        diverDetails: {
          needsGear,
          participantGear,
        },
      })
    );

    dispatch(
      setParticipantBodyMeasurements({
        index: participantIndex ?? 0,
        bodyMeasurements,
      })
    );
  }, [
    formik.values.mask,
    formik.values.bcd,
    formik.values.snorkel,
    formik.values.fins,
    formik.values.wetsuit,
    formik.values.regulator,
    formik.values.boots,
    formik.values.height,
    formik.values.heightUnit,
    formik.values.weight,
    formik.values.weightUnit,
    formik.values.shoeSize,
    formik.values.bodyType,
    formik.values.needsGear,
  ]);

  useEffect(() => {
    if (
      isValid &&
      formik.values.firstName.trim() !== "" &&
      formik.values.lastName.trim() !== ""
    ) {
      if (onParticipantNameChange) {
        onParticipantNameChange(
          participantIndex ?? 0,
          formik.values.firstName,
          formik.values.lastName
        );
      }
    }
  }, [isValid, formik.values.firstName]);

  const [isValidContact, setIsValidContact] = useState<boolean>(false);

  useEffect(() => {
    const contactValid =
      formik.values.cfirstName.trim() !== "" &&
      formik.values.clastName.trim() !== "" &&
      formik.values.email.trim() !== "" &&
      formik.values.code.trim() !== "" &&
      formik.values.phone.trim() !== "";

    if (contactValid !== isValidContact) {
      setIsValidContact(contactValid);
      onContactValidationChange(contactValid);
      // dispatch(setContactFormData({ ...formik1.values }));
      if (contactValid) {
        dispatch(
          setContactFormDataNew({
            email: formik.values.email,
            firstName: formik.values.cfirstName,
            lastName: formik.values.clastName,
            phoneNumber: formik.values.phone,
            phoneCountryCode: formik.values.code,
            phoneCountryName: formik.values.country,
          })
        );
      }
    }
  }, [
    formik.values.cfirstName,
    formik.values.clastName,
    formik.values.email,
    formik.values.code,
    formik.values.phone,
    isValidContact,
  ]);

  useEffect(() => {
    const emergencyContact =
      formik.values.eFirstName &&
      formik.values.eLastName &&
      formik.values.ecode &&
      formik.values.ephone;

    if (emergencyContact) {
      dispatch(
        setEmergencyContactNew({
          eFirstName: formik.values.eFirstName,
          eLastName: formik.values.eLastName,
          phoneCountryCode: formik.values.ecode,
          phoneCountryName: formik.values.country, // Assuming `country` is the country name field
        })
      );
    }
  }, [
    formik.values.eFirstName,
    formik.values.eLastName,
    formik.values.ecode,
    formik.values.ephone,
    formik.values.country,
  ]);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newShow = !showsForm;
    setShow(newShow);
    if (onShowChange) {
      onShowChange(newShow);
    }
    const newNeedsGearValue = !formik.values.needsGear;
    formik.setFieldValue("needsGear", newNeedsGearValue);
  };

  // const dispatch = useDispatch();
  useEffect(() => {
    if (isSubmitButtonClicked) {
      console.log("Submitting form F...");
      formik.submitForm().then(() => {
        console.log("Main Form Submitted");
      });
    }
  }, [isSubmitButtonClicked]);

  return (
    <form className=" flex flex-col space-y-[10px]">
      {step === 1 && (
        <div>
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
                onClick={() =>
                  formik.setFieldValue("proof", !formik.values.proof)
                }
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
                  formik.setFieldValue(
                    "notPregnant",
                    !formik.values.notPregnant
                  )
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
                formik.values.needsGear ? "bg-green-500" : "bg-gray-500"
              }`}
            >
              <img src={down} />
            </button>
          </div>

          {/* this one is optional */}
          {formik.values.needsGear && <ExtraForm formik={formik} />}
          <div className="w-[459px] mt-[10px] border-1 border-gray-300 "></div>
        </div>
      )}
      {step === 2 && (
        <div>
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
                  name="eFirstName"
                  placeholder="First Name"
                />
                <input
                  value={formik.values.eLastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
                  name="eLastName"
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
        </div>
      )}
    </form>
  );
};

export default Form;
