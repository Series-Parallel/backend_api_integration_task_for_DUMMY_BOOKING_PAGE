import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

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

export const postBooking = createAsyncThunk(
  "booking/postBooking",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { formdata?: FormEntry };
      console.log("[postBooking] Full Redux State:", state);

      if (!state.formdata) {
        throw new Error("Form data is undefined in Redux state.");
      }

      const combinedData =
        state.formdata.combinedFormData[0].combinedFormData[0];

      if (!combinedData || combinedData.length === 0) {
        throw new Error("Combined form data is empty.");
      }

      console.log("[postBooking] Form Data:", combinedData);

      const requestData = {
        activity: "6797144e11ac382a787fe849", // Static activity ID
        participants: [
          {
            customerType: "67935ccc11ac382a787fc0ce", // Static customerType ID
            isDeclarationsProvided: true, // Static declaration
            diverDetails: {
              needsGear: false, // Static value
              participantGear: [], // Static empty array
            },
            personalInfo: {
              firstName: combinedData.firstName_0 || "", // Extract from Redux
              lastName: combinedData.lastName_0 || "",
              dob: new Date(combinedData.dateOfBirth_0).toISOString(), // Convert to API format
              gender: combinedData.gender_0 || "",
            },
          },
        ],
        accommodations: {}, // Static empty object
      };

      console.log("[postBooking] Final API Request:", requestData);

      const response = await fetch(
        "https://staging-api.bookwithbuddy.com/customer-webflow/business/67935ccc11ac382a787fc0c3/booking/summary",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ combinedData }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json();
    } catch (error: any) {
      console.error("Error in postBooking:", error);
      return rejectWithValue(error.message);
    }
  }
);
export const { setMainFormData, setContactFormData, setCombineFormData } =
  formSlice.actions;
export default formSlice.reducer;
