import useSWRImmutable from 'swr/immutable';
import { Huddle } from '../../types';
import { fetcher } from './fetcher';

//GET Functions

export const getAllHuddles = () =>
  useSWRImmutable(
    'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted',
    fetcher
  );
//Returns: Array of Huddle Objects

export const getUsersGoingToHuddle = (huddle_id: number) =>
  useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/usersgoing?huddle-id=${huddle_id}`,
    fetcher
  );
//Returns: Array of UserId & UserName Objects

export const getHuddleById = (huddle_id: number) =>
  useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/gethuddle_byid?huddle-id=${huddle_id}`,
    fetcher
  );
//Returns: Array of One Huddle object.

export const getHuddleCategories = (id: number) =>
  useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/categories_of_huddle?huddle-id=${huddle_id}`,
    fetcher
  );
//Returns: Array of CategoryID & CategoryName Objects

//When you post a huddle the post function does not return the id yet, but it can return the date of creation. With that you can use a get to retrieve the id
export const getIdOfHuddleByDateOfCreation = (created_on: number) =>
  useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newhuddle/date-of-creation?date=${created_on}`,
    fetcher
  );
// Returns: Array of One Object with HuddleID & UserID (author)

// POST Functions

export const postHuddle = () => async (huddle: Huddle) => {
  try {
    const huddleToPost = await fetch(
      'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newhuddle',
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(huddle),
      }
    );
    return huddleToPost.json();
  } catch (e) {
    console.log('Error posting a Huddle in DB');
  }
};




