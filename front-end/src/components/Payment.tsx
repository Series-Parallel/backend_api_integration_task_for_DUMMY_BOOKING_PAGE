const Payment = () => {
  return (
    <div className="flex flex-col space-y-[10px] mb-[20px]">
      <div className="text-[35px] font-bold"> Payment</div>
      <div className="w-[509px] h-[80px] bg-[#f8f9fb] flex flex-col items-start pl-[10px] justify-center">
        <p className="font-semibold text-[13px]"> Free Cancellation before</p>
        <p className="text-[13px]">Cancel before for a partial refund</p>
      </div>
    </div>
  );
};

export default Payment;
