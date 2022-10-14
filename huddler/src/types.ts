import { StaticImageData } from 'next/image';

export interface Category {
  id?: number;
  name: string;
}
export interface User {
  username?: string;
  email?: string;
  createdOn?: number;
  id?: number;
  password?: string;
  first_name?: string;
  last_name?: string;
  image?: File | File[] | string | string[] | StaticImageData;
  date_of_birth?: string;
  interests?: Category[];
  default_longitude?: number;
  default_latitude?: number;
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


