import { useSelector } from "react-redux";
import { RootState } from "../store";

const Payment = () => {
  const bookingDone = useSelector(
    (state: RootState) => state.submitButton.bookingConfirm
  );

  return (
    <>
      {!bookingDone && (
        <div className="flex flex-col space-y-[10px] mb-[20px]">
          <div className="text-[35px] font-bold"> Payment</div>
          <div className="w-[509px] h-[80px] bg-[#f8f9fb] flex flex-col items-start pl-[10px] justify-center">
            <p className="font-semibold text-[13px]">
              {" "}
              Free Cancellation before
            </p>
            <p className="text-[13px]">Cancel before for a partial refund</p>
          </div>
        </div>
      )}
      {bookingDone && (
        <div className="flex flex-col space-y-[10px] mb-[20px] text-center">
          <div className="text-[35px] font-bold"> Payment Done!</div>
          <div className="w-[1000px] h-[100px] bg-[#f8f9fb] flex flex-col items-center pl-[10px] justify-center">
            <p className="font-semibold text-[20px]">
              {" "}
              Your Booking is Confirm!
            </p>
            <p className="text-[20px]">Enjoy your Activivty!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Payment;
