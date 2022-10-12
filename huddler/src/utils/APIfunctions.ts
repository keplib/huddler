import useSWRImmutable from 'swr/immutable'
import {fetcher} from './fetcher'

// Get functions
export const getAllHuddles = () => useSWRImmutable(
  'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted',
  fetcher
);

export const getAllCategories = () => useSWRImmutable(
  'https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/get-all-categories',
  fetcher
);

export const getUserById = () => {};
export const getHuddlesById = () => {};
export const getCategoriesById = () => {};

// Post functions

export const postUser = () => {};
export const postHuddle = () => {};