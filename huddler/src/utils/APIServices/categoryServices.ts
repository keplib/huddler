import useSWRImmutable from "swr/immutable";
import { fetcher } from "./fetcher";

// GET Functions

export const getAllCategories = () =>
  useSWRImmutable(
    "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/get-all-categories",
    fetcher
  );
// Returns: Array of Huddle Objects

export const getUsersInCategory = (category_id: number) =>
  useSWRImmutable(
    ` https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers_bycategory?category-id=${category_id}`,
    fetcher
  );
//Returns: Array of User Objects

export const getCategoryById = () => useSWRImmutable(fetcher);

export const getHuddlesInCategory = (category_id: number) =>
  useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/gethuddles_bycategory?category-id=${category_id}`,
    fetcher
  );
//Returns: Array of Huddle Objects

// POST Functions
