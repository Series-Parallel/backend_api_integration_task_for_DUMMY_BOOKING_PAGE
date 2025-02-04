const ContactForm = () => {
  return (
    <div className="flex flex-col space-y-[20px] mb-[20px]">
      <div className="text-[35px] font-bold"> Contact</div>
      <div className="text-[20px]"> Booking contact</div>
      <form className="flex flex-col space-y-[10px]">
        <div className="flex flex-row space-x-[13px]">
          <input
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="firstName"
            placeholder="First Name"
          />
          <input
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row space-x-[13px]">
          <select
            className="w-[126px] h-[56px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 "
            name="countryCode"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
          </select>
          <input
            name="Phonenumber"
            placeholder="Phone Number"
            className="w-[371px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
        </div>
        <input
          name="email"
          placeholder="Email"
          className="w-[510px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
        />
        <div className="text-[20px] mt-[10px] mb-[10px]">
          Emergency Contact (optional)
        </div>
        <div className="flex flex-row space-x-[13px]">
          <input
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="firstName"
            placeholder="First Name"
          />
          <input
            className="w-[249px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
            name="lastName"
            placeholder="Last Name"
          />
        </div>
        <div className="flex flex-row space-x-[13px]">
          <select
            className="w-[126px] h-[56px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300 "
            name="countryCode"
          >
            <option value="+1">+1</option>
            <option value="+91">+91</option>
          </select>
          <input
            name="Phonenumber"
            placeholder="Phone Number"
            className="w-[371px] h-[55px] font-semibold pl-[10px] border-gray-400 border rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
