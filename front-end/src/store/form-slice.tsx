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

interface MainFormState {
  mainFormDataList: MainFormData[];
}

//now here we will make two more interface
// one for contact form []
// and then one for combined form! that will be [] = mainForm[] + contactForm[]
// ok cool!