import { fetcher } from '../helperFunctions';

// GET Functions

export const getAllUsers = async () =>
  await fetcher(
    'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers'
  );
//Returns: Array of User Objects

export const getUserById = async (user_id: number) =>
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getuser_byid?user-id=${user_id}`
  );
// Returns: Array of One User Object

export const getUserCategories = async (user_id: number) =>
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories?user-id=${user_id}`
  );
//Returns: Array of CategoryID (id) & CategoryName (name) Objects

export const getUserCreatedHuddles = async (user_id: number) =>
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_created?user-id=${user_id}`
  );
// Return: Array of Huddle Objects

export const getUserGoingHuddles = async (user_id: number) =>
  await `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_isgoing?user-id=${user_id}`;
//Return: Array of Huddle Objects


// POST Functions

