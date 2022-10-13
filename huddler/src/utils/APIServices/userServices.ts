import { datacatalog } from 'googleapis/build/src/apis/datacatalog';
import useSWRImmutable from 'swr/immutable';
import { Huddle, User } from '../../types';
import { fetcher } from './fetcher';

// GET Functions

export const getAllUsers = () => {
  const { data: allUsers, error: error } = useSWRImmutable(
    'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers',
    fetcher
  );
  return allUsers ? allusers : error;
};
//Returns: Array of User Objects

export const getUserById = (user_id: number) => {
  const { data: user, error: error } = useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getuser_byid?user-id=${user_id}`,
    fetcher
  );
  return user ? user : error;
};
// Returns: Array of One User Object

// export const getUserCategories = (user_id: number) => {
//   const { data: userInterests, error: error } = useSWRImmutable(
//     `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories?user-id=${user_id}`,
//     fetcher
//   );
//   return userInterests ? userInterests : error;
// };

export const getUserCategories = async (user_id: number) => {
 return await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories?user-id=${user_id}`
 
  );  
};
//Returns: Array of CategoryID (id) & CategoryName (name) Objects

export const getUserCreatedHuddles = (user_id: number) => {
  const { data: userCreations, error: error } = useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_created?user-id=${user_id}`,
    fetcher
  );
  return userCreations ? userCreations : error;
};
// Return: Array of Huddle Objects

export const getUserGoingHuddles = (user_id: number) => {
  const { data: userGoing, error: error } = useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_isgoing?user-id=${user_id}`,
    fetcher
  );
  return userGoing ? userGoing : error;
};
//Return: Array of Huddle Objects

// POST Functions

// export const postUser = async (user: User) => {
//   try {
//     const userToPost = await fetch(,{
//       method: 'PUT',
//       headers: { 'Content-type': 'application/json; charset=UTF-8' },
//       body: JSON.stringify(user),
//         });
//       return userToPost.json()

//   } catch (e) {
//     console.log('Error posting a User in DB')
//   }

// }


