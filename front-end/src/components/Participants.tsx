import { RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store";
import { decrementDivs, incrementDivs } from "../store/participants-slice";
import { useState } from "react";
import Form from "./Form";

import down from "../assets/down-arrow.png";
import up from "../assets/up-arrow.png";
import bin from "../assets/bin.png";
import warning from "../assets/warning.png";

const Participants: React.FC = () => {
  const numDivs = useSelector((state: RootState) => state.participants.numDivs);
  const dispatch = useDispatch<AppDispatch>();
  const [extraForms, setExtraForms] = useState<boolean[]>([]);
  const [shows, setShows] = useState<boolean[]>([]);

  const handlExtraForm = (index: number) => {
    setExtraForms((prev) =>
      prev.map((form, i) => (i === index ? !form : form))
    );
  };

  const handleAddingDivs = () => {
    dispatch(incrementDivs());
    setExtraForms((prev) => [...prev, false]);
    setShows((prev) => [...prev, false]);
  };

  const handleRemovingDivs = (index: number) => {
    dispatch(decrementDivs());
    setExtraForms((prev) => prev.filter((_, i) => i !== index));
    setShows((prev) => prev.filter((_, i) => i !== index));
  };

  const handlShowChange = (index: number, childShow: boolean) => {
    setShows(
      (prev) => prev.map((shows, i) => (i === index ? childShow : shows)) // Update the specific show
    );
  };

  return (
    <div className="ml-[50px] flex flex-col space-y-[30px]">
      <div className="text-[35px] mt-[50px] font-bold">Select participants</div>
      <div className="w-[550px] h-[104px]  border-1 border-gray-300 rounded-[20px] flex flex-row justify-center items-center">
        <div className="flex flex-col text-[15px] mr-[200px] ">
          <div>Snorkeler Youth</div>
          <div>Ages 8-12</div>
        </div>
        <div className="w-[56px] h-[32px] bg-[#EEFFCC] rounded-lg  justify-items-center  text-center mr-[30px] text-[#4D661A]">
          $100
        </div>
        <div className="mr-[30px]">{numDivs}</div>
        <button
          className="w-[44px] cursor-pointer h-[44px] rounded-[50px] font-bold text-[20px] border-2 border-gray-200  "
          onClick={handleAddingDivs}
        >
          +
        </button>
      </div>

      {numDivs > 0 && (
        <div className="w-[550px]  bg-[#F2F4F7] rounded-lg flex flex-col pl-[25px] pb-[25px] space-y-[20px] mb-[20px] ">
          <div className="text-[#8A9099] mt-[15px]">
            Please provide additional details for each participant
          </div>
          {[...Array(numDivs)].map((_, index) => (
            <div
              key={index}
              className="w-[504px] pt-[20px] pb-[20px] justify-center items-center flex flex-col space-y-[20px]  bg-white rounded-lg"
            >
              <div className="flex flex-row space-x-[20px]">
                <button
                  className="w-[40px] h-[40px] rounded-[50px] border-2 border-gray-200 cursor-pointer"
                  onClick={() => handlExtraForm(index)}
                >
                  {extraForms[index] === false ? (
                    <img src={down} />
                  ) : (
                    <img src={up} />
                  )}
                </button>
                <div className="flex flex-col text-[15px] mr-[250px]">
                  <div className="text-[17px]">Participant {index + 1}</div>
                  <div className="text-[#8A9099]">Snorkeler Youth</div>
                </div>
                <p className="mt-[12px]">
                  <img className="w-[24px] h-[24px]" src={warning} />
                </p>
                <button
                  className="cursor-pointer"
                  onClick={() => handleRemovingDivs(index)}
                >
                  <img className="w-[24px] h-[24px]" src={bin} alt="bin" />
                </button>
              </div>
              {extraForms[index] && (
                <Form
                  onShowChange={(childShow) =>
                    handlShowChange(index, childShow)
                  }
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Participants;
