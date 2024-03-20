export interface ApplicationType {
  application: {
    id: string;
    firstName: string;
    lastName: string;
    duration: string;
    image: string;
    course: string;
    status: string;
    createdAt: string;
  };
}

export interface SingleApplicationType {
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName: string;
  birthDay: string;
  bloodGroup: string;
  mobileNumber: string;
  guardianNumber: string;
  gender: string;
  gpa: string;
  nationality: string;
  nid: string;
  passingYear: string;
  regNumber: string;
  religion: string;
  rollNumber: string;
  image: string;
  fullAddress: string;
  district: string;
  courseName: string;
  duration: string;
  education: string;
  board: string;
  course: string;
  pc: string;
  email: string;
  transactionId: string;
  fatherOccupation: string;
  maritalStatus: string;
  session: string;
}

export interface SingleApplicationUserType {
  application: {
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    birthDay: string;
    bloodGroup: string;
    mobileNumber: string;
    guardianNumber: string;
    gender: string;
    gpa: string;
    nationality: string;
    nid: string;
    passingYear: string;
    regNumber: string;
    religion: string;
    rollNumber: string;
    image: string;
    fullAddress: string;
    district: string;
    courseName: string;
    duration: string;
    education: string;
    board: string;
    course: string;
    pc: string;
    email: string;
    transactionId: string;
    fatherOccupation: string;
    maritalStatus: string;
    roll: number;
    user: {
      phoneNumber: string;
      email: string;
    };
    session: string;
  };
}
