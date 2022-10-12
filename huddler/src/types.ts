import { StaticImageData } from "next/image";

export interface Category {
  id?: number,
  name: string,
}
export interface User {
  name: string;
  email: string;
  createdOn?: number;
  id?: number;
  password?: string;
  firstName?: string;
  lastName?: string;
  avatar?: File | File[] | string | string[];
  dateOfBirth?: string;
  interests?: Category[]
  longitude: number;
  latitude: number;
}

export interface Huddle {
  name: string;
  date_of_creation: string;
  when: string;
  description: string;
  authorId: number;
  longitude: number;
  latitude: number;
  id?: number;
  images: { stringValues: string[] };
  categories: string[];
}

export interface Category {
  id: number,
  name: string,
}
