import { useState } from "react";
import Cart from "./components/Cart";
import Participants from "./components/Participants";
import ProgressBar from "./components/ProgressBar";

function App() {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  // const [isSubmitButtonClicked, setIsSubmitButtonClicked] =
  //   useState<boolean>(false);

  const [isContactFormVisible, setIsContactFormVisible] =
    useState<boolean>(false);

  const [isContactFormValid, setIsContactFormValid] = useState<boolean>(false);

  // const handleSubmitButtonClick = (): void => {
  //   setIsSubmitButtonClicked(true);
  // };

  const handleContinueClick = (): void => {
    setIsContactFormVisible(true);
  };

  const handleContactFormValidation = (isValid: boolean): void => {
    setIsContactFormValid(isValid);
  };
  

  return (
    <>
      <div className="flex flex-col min-h-screen mb-[10px] ml-[200px] mt-[20px] space-y-[20px]  border-1 border-gray-300 rounded-[20px] w-[1100px] ">
        <ProgressBar />
        <div className="flex flex-row space-x-[30px]">
          <Participants
            onFormValidChange={setIsFormValid}
            // isSubmitButtonClicked={isSubmitButtonClicked}
            isContinueButtonClicked={isContactFormVisible}
            onContactFormValidChange={handleContactFormValidation}
          />
          <Cart
            isFormValid={isFormValid}
            onContinueClick={handleContinueClick}
            isContactFormValid={isContactFormValid}
          />
        </div>
      </div>
    </>
  );
}

export default App;
