import { Hobby } from "./hobby.model";

export interface User {
  id: string
  name: string
  lastName: string
  email: string
  age: number
  gender: string
  phoneNumber: string
  address: string
  dateOfBirth: string
  hobbies: string[] | Hobby[]
}
