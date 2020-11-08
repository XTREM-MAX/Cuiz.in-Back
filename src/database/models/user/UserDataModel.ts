export default interface UserDataModel {
  id?: number;
  email: string;
  password: string;
  name: string;
  jwtSalt?: string;
}