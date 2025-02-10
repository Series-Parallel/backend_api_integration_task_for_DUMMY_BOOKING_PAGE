import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
}
interface ParticipantGear {
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

interface DiverDetails {
  needsGear: boolean;
  participantGear: ParticipantGear;
}

interface Participant {
  personalInfo: PersonalInfo;
  customerType: "67935ccc11ac382a787fc0ce";
  diverDetails: DiverDetails;
  isDeclarationsProvided: boolean;
}

interface BookingContact {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  phoneCountryCode: string;
  phoneCountryName: string;
}

interface EmergencyContact {
  eFirstName?: string;
  eLastName?: string;
  phoneCountryCode?: string;
  phoneCountryName?: string;
}

interface BookingData {
  activity: string;
  activityTemplate: string;
  bookingContact: BookingContact;
  emergencyContact: EmergencyContact;
  participants: Participant[];
}

const initialState: BookingData = {
  activity: "6797144e11ac382a787fe849",
  activityTemplate: "6797142a11ac382a787fe7bd",
  bookingContact: {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    phoneCountryCode: "",
    phoneCountryName: "United States",
    email: "",
  },
  emergencyContact: {
    eFirstName: "",
    eLastName: "",
    phoneCountryCode: "",
    phoneCountryName: "United States",
  },
  participants: [],
};

const bookingSlice = createSlice({
  name: "bookingData",
  initialState,
  reducers: {
    // Add a new participant to the list
    addParticipantNew(state) {
      // Add an empty participant object to the participants array
      state.participants.push({
        personalInfo: {
          firstName: "",
          lastName: "",
          dob: "",
          gender: "",
        },
        customerType: "67935ccc11ac382a787fc0ce", // Static value
        diverDetails: {
          needsGear: false,
          participantGear: {},
        },
        isDeclarationsProvided: false,
      });
    },

    // Remove a participant by index
    removeParticipantNew(state, action: PayloadAction<number>) {
      state.participants = state.participants.filter(
        (_, i) => i !== action.payload
      );
    },

    // Update a participant by index
    // updateParticipant(
    //   state,
    //   action: PayloadAction<{ index: number; participant: Participant }>
    // ) {
    //   const { index, participant } = action.payload;
    //   state.participants[index] = participant;
    // },

    setPersonalInfo(
      state,
      action: PayloadAction<{
        index: number;
        firstName: string;
        lastName: string;
        dob: string;
        gender: string;
      }>
    ) {
      const { index, firstName, lastName, dob, gender } = action.payload;
      if (state.participants[index]) {
        state.participants[index].personalInfo = {
          firstName,
          lastName,
          dob,
          gender,
        };
        console.log("Personal info", state.participants[index].personalInfo);
      }
    },
    setIsDeclarationsProvided(state, action: PayloadAction<number>) {
      if (state.participants[action.payload]) {
        state.participants[action.payload].isDeclarationsProvided = true;
        console.log(
          "Declaration",
          state.participants[action.payload].isDeclarationsProvided
        );
      }
    },
    setParticipantNeedsGear(state, action: PayloadAction<number>) {
      if (state.participants[action.payload]) {
        state.participants[action.payload].diverDetails.needsGear = true;
      }
    },
  },
});

export const {
  addParticipantNew,
  removeParticipantNew,
  setPersonalInfo,
  setIsDeclarationsProvided,
} = bookingSlice.actions;
export default bookingSlice.reducer;
