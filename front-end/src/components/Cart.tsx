import { RootState } from "../store";
import { useSelector } from "react-redux";

interface CartProps {
  isFormValid: boolean;
  onSubmitClick: () => void;
}

const Cart: React.FC<CartProps> = ({ isFormValid, onSubmitClick }) => {
  const numberOfItems = useSelector(
    (state: RootState) => state.participants.numDivs
  );
  return (
    <div className="flex flex-col space-y-[30px]">
      <div
        className="w-[422px]  border-1 border-gray-300 rounded-lg pl-[25px] mt-[70px] flex flex-col space-y-[10px]"
        style={{ height: `${numberOfItems > 0 ? "359px" : "200px"}` }}
      >
        <div className="flex flex-row space-x-[20px] justify-start  items-center mt-[20px] ">
          <div className="w-[80px] h-[80px] rounded-lg bg-[#f2f4f7]  "></div>
          <div className="flex flex-col space-y-[10px]">
            <div className="text-[17px]"> Tour of 27 jan</div>
            <div className="w-[89px] h-[32px] bg-[#f2f4f7] rounded-lg text-[#8a9099] text-center pt-[2px]">
              {" "}
              1 hours
            </div>
          </div>
        </div>
        <p className="text-[15px] text-[#8a9099] mt-[10px]">
          O Monday Jan 27, 2025
        </p>
        <p className="text-[15px] text-[#8a9099]">08:00 AM — 09:00 AM</p>
        {numberOfItems > 0 && (
          <div className="flex flex-col space-y-[10px]">
            <div className="w-[372px] border-1 border-gray-300 "></div>
            <div className="flex flex-row justify-between pr-[20px] ">
              <p className="text-[15px]">{numberOfItems}x Snorkeler Youth</p>
              <p className="text-[14px] text-[#8a9099]">
                ${100 * numberOfItems}
              </p>
            </div>
            <div className="w-[372px] border-1 border-gray-300 "></div>
            <div className="flex flex-row justify-between pr-[20px] ">
              <p className="text-[15px] text-[#8a9099]">Subtotal</p>
              <p className="text-[14px] text-[#8a9099]">
                ${100 * numberOfItems}
              </p>
            </div>
            <div className="flex flex-row justify-between pr-[20px] ">
              <p className="text-[15px] text-[#8a9099]">Taxes and fees</p>
              <p className="text-[14px] text-[#8a9099]">$0</p>
            </div>
            <div className="flex flex-row justify-between pr-[20px] ">
              <p className="text-[17px]">Total</p>
              <p className="text-[17px] ">${100 * numberOfItems}</p>
            </div>
          </div>
        )}
      </div>
      <button
        type="submit"
        disabled={!isFormValid}
        className={`w-[422px] h-[48px] rounded-[50px]   ${
          isFormValid
            ? "bg-black text-white cursor-pointer"
            : "bg-[#F2F4F7] cursor-not-allowed"
        }`}
        onClick={onSubmitClick}
      >
        Continue
      </button>
    </div>
  );
};

export default Cart;
