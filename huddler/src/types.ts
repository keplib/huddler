import { StaticImageData } from "next/image";

export interface User {
  name: string;
  email: string;
  createdOn: number;
  id?: number;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: StaticImageData |string;
  dateOfBirth?: Date;
}

export interface Huddle {
  name: string;
  createdOn: number;
  when: string;
  description: string;
  authorId: number;
  longitude: number;
  latitude: number;
  id?: number;
  images?: string[];
}
