import { fetcher } from '../helperFunctions';

// GET Functions

export const getAllCategories = async () =>
  await fetcher(
    'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/get-all-categories'
  );

// Returns: Array of Huddle Objects

export const getUsersInCategory = async (category_id: number) =>
  await await fetcher(
    ` https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers_bycategory?category-id=${category_id}`
  );
//Returns: Array of User Objects

export const getHuddlesInCategory = async (category_id?: number) => {
  return await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/gethuddles_bycategory?category-id=${category_id}`
  );
};

//Returns: Array of Huddle Objects

// export const getCategoryById = () => useSWRImmutable(, fetcher);

// POST Functions

