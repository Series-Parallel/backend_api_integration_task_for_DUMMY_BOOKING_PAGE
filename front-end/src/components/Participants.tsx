import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
// import { addParticipant, removeParticipant } from "../store/participants-slice";
import { useState } from "react";
import Form from "./Form";

import down from "../assets/down-arrow.png";
import up from "../assets/up-arrow.png";
import bin from "../assets/bin.png";
import warning from "../assets/warning.png";
import safe from "../assets/check-mark.png";
import ContactForm from "./ContactForm";
import Payment from "./Payment";
import Cart from "./Cart";
import {
  addParticipantNew,
  removeParticipantNew,
} from "../store/newFinal-slice";

interface ParticipantsProps {}

const Participants: React.FC<ParticipantsProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const participants = useSelector(
    (state: RootState) => state.booking.participants
  );
  const [extraForms, setExtraForms] = useState<boolean[]>([]);
  const [shows, setShows] = useState<boolean[]>([]);
  const [isFormValid, setIsFormValid] = useState<boolean[]>(
    new Array(participants.length).fill(false)
  );
  const [participantName, setParticipantName] = useState<string[]>([]);
  const [participantSurName, setParticipantSurName] = useState<string[]>([]);
  const [formValidChange, setFormValidChange] = useState<boolean>(false);
  const [isContactFormVisible, setIsContactFormVisible] =
    useState<boolean>(false);
  const [isContactFormValid, setIsContactFormValid] = useState<boolean>(false);
  const [isPaymentVisible, setIsPaymentVisible] = useState<boolean>(false);
  const step = useSelector((state: RootState) => state.step.step);

  const handleExtraForm = (index: number) => {
    setExtraForms((prev) =>
      prev.map((form, i) => (i === index ? !form : form))
    );
  };

  const handleAddingDivs = () => {
    // const newParticipant = `Participant ${participants.length + 1}`;
    // dispatch(addParticipant(newParticipant));
    dispatch(addParticipantNew());
    setExtraForms((prev) => [...prev, false]);
    setShows((prev) => [...prev, false]);
    setIsFormValid((prev) => [...prev, false]);
  };

  const handleRemovingDivs = (index: number) => {
    console.log("Index passed:", index);
    // dispatch(removeParticipant(index));
    dispatch(removeParticipantNew(index));
    setExtraForms((prev) => prev.filter((_, i) => i !== index));
    setShows((prev) => prev.filter((_, i) => i !== index));
    setIsFormValid((prev) => prev.filter((_, i) => i !== index));
    setParticipantName((prev) => prev.filter((_, i) => i !== index));
    setParticipantSurName((prev) => prev.filter((_, i) => i !== index));
  };

  const handleShowChange = (index: number, childShow: boolean) => {
    setShows((prev) =>
      prev.map((shows, i) => (i === index ? childShow : shows))
    );
  };

  const handleFormValidChange = (index: number, isValid: boolean) => {
    const updatedIsFormValid = [...isFormValid];
    updatedIsFormValid[index] = isValid;
    setIsFormValid(updatedIsFormValid);
    setFormValidChange(updatedIsFormValid.every(Boolean));
  };

  const handleContactFormVisibility = (): void => {
    setIsContactFormVisible(true);
  };

  const handleParticipantNameChange = (
    index: number,
    name: string,
    surName: string
  ) => {
    const updatedNames = [...participantName];
    const updatedSurnames = [...participantSurName];

    updatedNames[index] = name;
    updatedSurnames[index] = surName;

    setParticipantName(updatedNames);
    setParticipantSurName(updatedSurnames);
  };

  return (
    <div className="flex flex-row space-x-[30px]">
      <div className="ml-[50px] flex flex-col space-y-[30px]">
        {step === 1 && (
          <div className=" flex flex-col space-y-[30px]">
            {" "}
            <div className="text-[35px] mt-[50px] font-bold">
              Select participants
              <div>Number of Participants: {participants.length}</div>
            </div>
            <div className="w-[550px] h-[104px]  border-1 border-gray-300 rounded-[20px] flex flex-row justify-center items-center">
              <div className="flex flex-col text-[15px] mr-[200px] ">
                <div>Snorkeler Youth</div>
                <div>Ages 8-12</div>
              </div>
              <div className="w-[56px] h-[32px] bg-[#EEFFCC] rounded-lg  justify-items-center  text-center mr-[30px] text-[#4D661A]">
                $100
              </div>
              <div className="mr-[30px]">{participants.length}</div>
              <button
                className="w-[44px] cursor-pointer h-[44px] rounded-[50px] font-bold text-[20px] border-2 border-gray-200  "
                onClick={handleAddingDivs}
              >
                +
              </button>
            </div>
            {participants.length > 0 && (
              <div className="w-[550px]  bg-[#F2F4F7] rounded-lg flex flex-col pl-[25px] pb-[25px] space-y-[20px] mb-[20px] ">
                <div className="text-[#8A9099] mt-[15px]">
                  Please provide additional details for each participant
                </div>
                {participants.map((_, index) => (
                  <div
                    key={index}
                    className="w-[504px] pt-[20px] pb-[20px] justify-center items-center flex flex-col space-y-[20px]  bg-white rounded-lg"
                  >
                    <div className="flex flex-row space-x-[20px]">
                      <button
                        className="w-[40px] h-[40px] rounded-[50px] border-2 border-gray-200 cursor-pointer"
                        onClick={() => handleExtraForm(index)}
                      >
                        {extraForms[index] === false ? (
                          <img src={down} />
                        ) : (
                          <img src={up} />
                        )}
                      </button>
                      <div className="flex flex-col text-[15px] mr-[250px]">
                        <div className="text-[17px]">
                          {isFormValid[index] &&
                          participantName[index] &&
                          participantSurName[index] ? (
                            <span className="flex flex-row space-x-[5px]">
                              <p>{participantName[index]}</p>
                              <p>{participantSurName[index]}</p>
                            </span>
                          ) : (
                            <p>Participant {index + 1}</p>
                          )}
                        </div>
                        <div className="text-[#8A9099]">Snorkeler Youth</div>
                      </div>
                      <p className="mt-[12px]">
                        <img
                          className="w-[24px] h-[24px]"
                          src={isFormValid[index] ? safe : warning}
                        />
                      </p>
                      <button
                        className="cursor-pointer"
                        onClick={() => handleRemovingDivs(index)}
                      >
                        <img
                          className="w-[24px] h-[24px]"
                          src={bin}
                          alt="bin"
                        />
                      </button>
                    </div>
                    {extraForms[index] && (
                      <Form
                        onShowChange={(childShow) =>
                          handleShowChange(index, childShow)
                        }
                        showsForm={shows[index]}
                        participantIndex={index}
                        onFormValidChange={handleFormValidChange}
                        onParticipantNameChange={(index, name, surName) =>
                          handleParticipantNameChange(index, name, surName)
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {step === 2 && (
          <ContactForm onContactValidationChange={setIsContactFormValid} />
        )}
        {step === 3 && <Payment />}
      </div>
      <Cart
        isFormValid={formValidChange}
        onContinueClick={handleContactFormVisibility}
        isContactFormValid={isContactFormValid}
        onPaymentVisibilityChange={setIsPaymentVisible}
      />
    </div>
  );
};

export default Participants;
