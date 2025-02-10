import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PersonalInfo {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
}

interface Height {
  height?: number;
  heightUnit?: string;
}

interface Weight {
  weight?: number;
  weightUnit?: string;
}

interface BodyMeasurements {
  height?: Height;
  // shoeSizeType?: string;
  weight?: Weight;
  shoeSize?: number;
  bodyType?: string;
}

interface ParticipantGear {
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
  bodyMeasurements: BodyMeasurements;
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
        bodyMeasurements: {
          weight: {
            weight: undefined,
            weightUnit: undefined,
          },
          height: {
            height: undefined,
            heightUnit: undefined,
          },
          shoeSize: undefined,
          bodyType: "",
        },
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
    setIsDeclarationsProvided(
      state,
      action: PayloadAction<{ index: number; isDeclarationsProvided: boolean }>
    ) {
      const { index, isDeclarationsProvided } = action.payload;
      if (state.participants[index]) {
        state.participants[index].isDeclarationsProvided =
          isDeclarationsProvided;
        console.log(
          `Declaration of participant ${index} is set to`,
          state.participants[index].isDeclarationsProvided
        );
      }
    },

    setParticipantDiverDetails(
      state,
      action: PayloadAction<{ index: number; diverDetails: DiverDetails }>
    ) {
      const { index, diverDetails } = action.payload;
      if (state.participants[index]) {
        state.participants[index].diverDetails = diverDetails;
        console.log(
          `Diver Details for participant ${index} updated:`,
          state.participants[index].diverDetails
        );
      }
    },

    setParticipantBodyMeasurements(
      state,
      action: PayloadAction<{
        index: number;
        bodyMeasurements: BodyMeasurements;
      }>
    ) {
      const { index, bodyMeasurements } = action.payload;
      if (state.participants[index]) {
        state.participants[index].bodyMeasurements = {
          ...bodyMeasurements,
        };
        console.log(
          `Body Measurements for participant ${index} updated:`,
          state.participants[index].bodyMeasurements
        );
      }
    },

    setContactFormDataNew(state, action: PayloadAction<BookingContact>) {
      const {
        email,
        firstName,
        lastName,
        phoneNumber,
        phoneCountryCode,
        phoneCountryName,
      } = action.payload;

      // Update the BookingContact state
      state.bookingContact = {
        email,
        firstName,
        lastName,
        phoneNumber,
        phoneCountryCode,
        phoneCountryName,
      };

      console.log("Updated Booking Contact:", state.bookingContact);
    },

    setEmergencyContactNew(state, action: PayloadAction<EmergencyContact>) {
      const { eFirstName, eLastName, phoneCountryCode, phoneCountryName } =
        action.payload;

      // Update the EmergencyContact in state
      state.emergencyContact = {
        eFirstName,
        eLastName,
        phoneCountryCode,
        phoneCountryName,
      };

      console.log("Updated Emergency Contact:", state.emergencyContact);
    },
  },
});

export const {
  addParticipantNew,
  removeParticipantNew,
  setPersonalInfo,
  setIsDeclarationsProvided,
  setParticipantDiverDetails,
  setParticipantBodyMeasurements,
  setContactFormDataNew,
  setEmergencyContactNew,
} = bookingSlice.actions;
export default bookingSlice.reducer;
