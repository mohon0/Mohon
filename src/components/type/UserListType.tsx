export interface UserListType {
  id: string;
  name: string;
  email: string;
  image: string;
  phoneNumber: string;
  applications: [
    {
      image: string;
    },
  ];
}
