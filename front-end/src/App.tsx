import Participants from "./components/Participants";
import ProgressBar from "./components/ProgressBar";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen mb-[10px] ml-[200px] mt-[20px] space-y-[20px]  border-1 border-gray-300 rounded-[20px] w-[1100px] ">
        <ProgressBar />
        <Participants />
      </div>
    </>
  );
}

export default App;
