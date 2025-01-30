import { useState } from "react";

const ExtraForm = () => {
  const [weight, setWeight] = useState<string>("");

  const [height, setHeight] = useState<string>("");

  const [selectedButton, setSelectedButton] = useState<Set<string>>(new Set());

  const handleWeightUnitChange = (unit: string) => {
    setWeight(unit);
  };

  const handleHeightUnitChange = (unit: string) => {
    setHeight(unit);
  };

  const toggleSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    e.preventDefault();
    setSelectedButton((prevSelected) => {
      const newSelected = new Set(prevSelected);

      if (newSelected.has(item)) {
        newSelected.delete(item);
      } else {
        newSelected.add(item);
      }
      return newSelected;
    });
  };
  const equipment = [
    "Mask",
    "Snorkel",
    "Fins",
    "Boots",
    "BCD",
    "Wetsuit",
    "Regulator",
  ];
  return (
    <div className="flex flex-col space-y-[10px]">
      {/* Weight radio button*/}
      <div className="flex flex-row justify-between">
        <p className="text-[13px] text-gray-400 mt-[15px]">Weight</p>
        <label className="flex items-center space-x-2 ml-[70px]">
          <input
            type="radio"
            name="weight"
            className="form-radio"
            checked={weight === "lbs"}
            onChange={() => handleWeightUnitChange("lbs")}
          />
          <span>lbs</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="weight"
            className="form-radio"
            checked={weight === "kg"}
            onChange={() => handleWeightUnitChange("kg")}
          />
          <span>kg</span>
        </label>
        <input
          type="text"
          placeholder={weight ? `${weight}` : ""}
          className="w-[186px] pl-[150px] h-[52px] rounded-lg border-1 border-gray-400"
        />
      </div>

      {/* height radio button*/}
      <div className="flex flex-row justify-between">
        <p className="text-[13px] text-gray-400 mt-[15px]">Height</p>
        <label className="flex items-center space-x-2 ml-[70px]">
          <input
            type="radio"
            name="height"
            className="form-radio"
            checked={weight === "ft in"}
            onChange={() => handleHeightUnitChange("ft in")}
          />
          <span>ft in</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="height"
            className="form-radio"
            checked={height === "cm"}
            onChange={() => handleHeightUnitChange("cm")}
          />
          <span>cm</span>
        </label>
        <input
          type="text"
          placeholder={height ? `${height}` : ""}
          className="w-[186px] pl-[150px] h-[52px] rounded-lg border-1 border-gray-400"
        />
      </div>
      <div>
        <label className=" flex flex-row justify-between space-x-[10px]">
          <span className="text-[13px] text-gray-400 mt-[15px]">Shoe Size</span>
          <select
            aria-placeholder="ShoeSize"
            className="ml-[60px] w-[163px] font-semibold h-[48px] pl-[10px] pr-[30px] border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          >
            <option defaultValue="Gender" value="" disabled>
              ShoeSize
            </option>
            <option value="EU">EU</option>
            <option value="US Men">US Men</option>
            <option value="Us Women">Us Women</option>
            <option value="UK">UK</option>
          </select>
          <select className=" w-[163px] font-semibold h-[48px] pl-[10px] pr-[30px] border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300">
            <option defaultValue="Size" value="" disabled></option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
          </select>
        </label>
      </div>
      <div>
        <label className=" flex flex-row justify-between space-x-[10px]">
          <span className="text-[13px] text-gray-400 mt-[15px]">
            Body Shape
          </span>
          <select className="appearance-none w-[335px] font-semibold h-[48px] pl-[10px] pr-[30px] border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300">
            <option defaultValue="shape" value=" " disabled>
              Shape
            </option>
            <option value="Slim">Slim</option>
            <option value="Average">Average</option>
            <option value="Athletic">Athletic</option>
            <option value="Heavy">Heavy</option>
          </select>
        </label>
      </div>
      <div className="flex flex-row flex-wrap justify-baseline space-x-[10px] w-[455px] space-y-[10px]">
        {equipment.map((item) => (
          <button
            key={item}
            className={` text-center h-[40px] pl-[10px] pr-[10px] rounded-full border-1 border-gray-400 cursor-pointer
    ${
      selectedButton.has(item)
        ? "bg-blue-500 text-white  text-[17px]"
        : "bg-transparent text-black font-semibold text-[15px]"
    }`}
            onClick={(e) => toggleSelection(e, item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExtraForm;
