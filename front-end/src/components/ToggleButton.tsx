import { useState } from "react";

const ToggleButton = () => {
  const [isToggled, setIsToggled] = useState(false);

  const toggleHandler = () => {
    setIsToggled((prevState) => !prevState);
  };

  return (
    <button
      onClick={toggleHandler}
      className={`flex items-center p-2 rounded-full transition-all duration-300 ${
        isToggled ? "bg-blue-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`w-6 h-6 bg-white rounded-full transition-all duration-300 ${
          isToggled ? "translate-x-6" : "translate-x-0"
        }`}
      />
      <span className="ml-2 text-white">{isToggled ? "ON" : "OFF"}</span>
    </button>
  );
};

export default ToggleButton;
