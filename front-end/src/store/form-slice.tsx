import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MainFormData {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: string;
  proof: boolean;
  notFlying: boolean;
  notPregnant: boolean;
  weight?: number;
  weightUnit?: string;
  height?: number;
  heightUnit?: string;
  shoeSizeType?: string;
  shoeSize?: number;
  bodyType?: string;
  mask?: boolean;
  snorkel?: boolean;
  fins?: boolean;
  boots?: boolean;
  bcd?: boolean;
  wetsuit?: boolean;
  regulator?: boolean;
}

interface ContactFormData {
  firstName: string;
  lastName: string;
  code: string;
  email: string;
  phone: string;
  eFirstName?: string;
  eLastName?: string;
  ephone?: string;
  ecode?: string;
}

interface CombineFormState {
  combinedFormData: Record<string, any>[];
}

interface FormEntry {
  mainFormData: MainFormData[];
  contactFormData: ContactFormData[];
  combinedFormData: CombineFormState[];
}

const initialState: FormEntry = {
  mainFormData: [],
  contactFormData: [],
  combinedFormData: [],
};

const formSlice = createSlice({
  name: "formdata",
  initialState,
  reducers: {
    setMainFormData(state, action: PayloadAction<MainFormData>) {
      state.mainFormData.push(action.payload);
      console.log("Main form data", state.mainFormData);
    },
    setContactFormData(state, action: PayloadAction<ContactFormData>) {
      state.contactFormData.push(action.payload);
      console.log("Contact form data", state.contactFormData);
    },
    setCombineFormData(state) {
      let combinedData: Record<string, any> = {}; 

      // Process mainFormData
      state.mainFormData.forEach((item, index) => {
        Object.entries(item).forEach(([key, value]) => {
          combinedData[`${key}_${index}`] = value; 
        });
      });

      // Process contactFormData
      state.contactFormData.forEach((item, index) => {
        Object.entries(item).forEach(([key, value]) => {
          combinedData[`${key}_contact${index}`] = value; 
        });
      });

      // Store as a single object inside combinedFormData
      state.combinedFormData.push({ combinedFormData: [combinedData] });

      console.log(
        "Combined form data",
        JSON.parse(JSON.stringify(state.combinedFormData))
      );
    },
  },
});

export const { setMainFormData, setContactFormData, setCombineFormData } =
  formSlice.actions;
export default formSlice.reducer;
