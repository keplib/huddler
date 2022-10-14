import { StaticImageData } from 'next/image';

export interface Category {
  id?: number;
  name: string;
}
export interface User {
  name: string;
  email: string;
  createdOn?: number;
  id?: number;
  password?: string;
  firstName?: string;
  lastName?: string;
  image?: File | File[] | string | string[] | StaticImageData;
  dateOfBirth?: string;
  interests?: Category[];
  longitude?: number;
  latitude?: number;
  description?: string;
  categories?: Category[];
}

export interface Huddle {
  name: string;
  date_of_creation: number;
  day_time: string;
  address: string;
  description: string;
  fk_author_id: number;
  longitude: number;
  latitude: number;
  id?: number;
  image: string;
  link: string;
}

export interface Category {
  id?: number;
  name: string;
}
