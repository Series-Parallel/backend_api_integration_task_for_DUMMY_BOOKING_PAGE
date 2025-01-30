import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { setProgress } from "../store/progress-slice";

import left from "../assets/left.png";

const steps = ["Participants", "Contact", "Payment"];

const ProgressBar: React.FC = () => {
  const progress = useSelector((state: RootState) => state.progress.progress);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col mt-[20px] ">
      <div className="flex flex-row text-[20px] items-center space-x-[20px] justify-center">
        <button
          className="flex flex-row  font-bold cursor-pointer"
          onClick={() => dispatch(setProgress(progress - 1))}
          disabled={progress <= 1}
        >
          <div className="w-[40px] h-[40px] rounded-[50px] mr-[10px]  border-2 border-gray-500">
            <img src={left} />
          </div>
          Back
        </button>

        <div className="flex flex-row items-center space-x-[10px] ml-[250px] mr-[250px]">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-[30px] h-[30px] flex items-center justify-center rounded-full ${
                    index + 1 <= progress
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-500"
                  } font-bold`}
                >
                  {index + 1}
                </div>
                <span
                  className={`text-[15px] mt-2 ${
                    index + 1 === progress
                      ? "font-bold text-black"
                      : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className="h-1  mb-[30px] w-[60px] bg-gray-300"></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <button
          className="text-blue-500 font-bold cursor-pointer"
          onClick={() => dispatch(setProgress(progress + 1))}
          disabled={progress >= steps.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProgressBar;
