import { FormikProps } from "formik";

interface ExtraFormProps {
  formik: FormikProps<any>;
}

const ExtraForm: React.FC<ExtraFormProps> = ({ formik }) => {
  const toggleSelection = (
    e: React.MouseEvent<HTMLButtonElement>,
    item: string
  ) => {
    e.preventDefault();
    formik.setFieldValue(item, !formik.values[item]);
  };
  const equipment = [
    "mask",
    "snorkel",
    "fins",
    "boots",
    "bcd",
    "wetsuit",
    "regulator",
  ];
  return (
    <div className="flex flex-col space-y-[10px]">
      {/* Weight radio button*/}
      <div className="flex flex-row justify-between">
        <p className="text-[13px] text-gray-400 mt-[15px]">Weight</p>
        <label className="flex items-center space-x-2 ml-[70px]">
          <input
            type="radio"
            name="weightUnit"
            value="lbs"
            checked={formik.values.weightUnit === "lbs"}
            onChange={formik.handleChange}
          />
          <span>lbs</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="weightUnit"
            value="kg"
            checked={formik.values.weightUnit === "kg"}
            onChange={formik.handleChange}
          />
          <span>kg</span>
        </label>
        <input
          type="number"
          name="weight"
          placeholder={
            formik.values.weightUnit ? `${formik.values.weightUnit}` : ""
          }
          onChange={formik.handleChange}
          className="w-[186px] pl-[145px] h-[52px] rounded-lg border-1 border-gray-400"
        />
      </div>

      {/* height radio button*/}
      <div className="flex flex-row justify-between">
        <p className="text-[13px] text-gray-400 mt-[15px]">Height</p>
        <label className="flex items-center space-x-2 ml-[70px]">
          <input
            type="radio"
            name="heightUnit"
            value="ft in"
            checked={formik.values.heightUnit === "ft in"}
            onChange={formik.handleChange}
          />
          <span>ft in</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="heightUnit"
            value="cm"
            checked={formik.values.heightUnit === "cm"}
            onChange={formik.handleChange}
          />
          <span>cm</span>
        </label>
        <input
          type="number"
          name="height"
          placeholder={
            formik.values.heightUnit ? `${formik.values.heightUnit}` : ""
          }
          onChange={formik.handleChange}
          className="w-[186px] pl-[140px]  h-[52px] rounded-lg border-1 border-gray-400"
        />
      </div>
      <div>
        <label className=" flex flex-row justify-between space-x-[10px]">
          <span className="text-[13px] text-gray-400 mt-[15px]">Shoe Size</span>
          <select
            aria-placeholder="ShoeSize"
            name="shoeSizeType"
            value={formik.values.shoeSizeType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="ml-[60px] w-[163px] font-semibold h-[48px] pl-[10px] pr-[30px] border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          >
            <option defaultValue="ShoeSize" value="" disabled>
              ShoeSizeType
            </option>
            <option value="EU">EU</option>
            <option value="US Men">US Men</option>
            <option value="US Women">US Women</option>
            <option value="UK">UK</option>
          </select>

          <select
            name="shoeSize"
            value={formik.values.shoeSize}
            onChange={(e) => {
              formik.setFieldValue("shoeSize", Number(e.target.value));
            }}
            onBlur={formik.handleBlur}
            className=" w-[163px] font-semibold h-[48px] pl-[10px] pr-[30px] border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          >
            <option defaultValue="Size" value="" disabled>
              Shoe Size
            </option>
            <option value={21}>21</option>
            <option value={22}>22</option>
            <option value={23}>23</option>
            <option value={24}>24</option>
          </select>
        </label>
      </div>
      <div>
        <label className=" flex flex-row justify-between space-x-[10px]">
          <span className="text-[13px] text-gray-400 mt-[15px]">
            Body Shape
          </span>
          <select
            name="bodyType"
            value={formik.values.bodyType}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="appearance-none w-[335px] font-semibold h-[48px] pl-[10px] pr-[30px] border border-gray-400 rounded-lg focus:outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-300"
          >
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
            type="button"
            className={`text-center h-[40px] pl-[10px] pr-[10px] rounded-full border-1 border-gray-400 cursor-pointer ${
              formik.values[item]
                ? "bg-blue-500 text-white text-[17px]"
                : "bg-transparent text-black font-semibold text-[15px]"
            }`}
            onClick={(e) => toggleSelection(e, item)} // Use the toggle function
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}{" "}
            {/* Capitalize the first letter */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExtraForm;
