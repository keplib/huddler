import useSWRImmutable from "swr/immutable";
import { fetcher } from "./fetcher";

// GET Functions

export const getAllCategories = () => {
  const { data: allCategories, error: error } = seSWRImmutable(
    'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/get-all-categories',
    fetcher
  );
  return allCategories ? allCategories : error;
};
// Returns: Array of Huddle Objects

export const getUsersInCategory = (category_id: number) => {
  const { data: usersInCategory, error: error } = useSWRImmutable(
    ` https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers_bycategory?category-id=${category_id}`,
    fetcher
  );
  return usersInCategory ? usersInCategory : error;
};
//Returns: Array of User Objects

// export const getCategoryById = () => useSWRImmutable(, fetcher);

// export const getHuddlesInCategory = (category_id: number) => {
//   const { data: huddlesInCategory, error: error } = useSWRImmutable(
//     `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/gethuddles_bycategory?category-id=${category_id}`,
//     fetcher
//   );
//   return huddlesInCategory ? huddlesInCategory : error;
// };

export const getHuddlesInCategory = async (category_id: number) => {
   return await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/gethuddles_bycategory?category-id=${category_id}`
  );
 
};

//Returns: Array of Huddle Objects

// POST Functions
