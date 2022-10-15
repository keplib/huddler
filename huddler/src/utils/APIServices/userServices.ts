import { User } from "../../types";
import { fetcher } from "../helperFunctions";

// GET Functions

export const getAllUsers = async () =>
  await fetcher(
    "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers"
  );
//Returns: Array of User Objects

export const getUserById = async (aws_id: string) =>
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getuser_byid?user-id=${aws_id}`
  );
// Returns: Array of One User Object

export const getUserCategories = async (aws_id: string) =>
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories?user-id=${aws_id}`
  );
//Returns: Array of CategoryID (id) & CategoryName (name) Objects

export const getUserCreatedHuddles = async (aws_id: string) =>
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_created?user-id=${aws_id}`
  );
// Return: Array of Huddle Objects

export const getUserGoingHuddles = async (aws_id: string) =>
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_isgoing?user-id=${aws_id}`
  );
//Return: Array of Huddle Objects


// POST Functions

export const postUserInfo = async (user: User, aws_id: string) => {
  try {
    console.log('trying to post huddle category', user, aws_id);

    const newUserToPost = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newuser/update?user-id=${aws_id}`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    console.log(newUserToPost);
    return newUserToPost;
  } catch (e) {
    console.log('Error posting a a new user category in DB  ', e);
  }
};

export const postUserCategory = async (aws_id: string, userCategory: number) => {
  try {
    console.log('trying to post huddle category', aws_id, userCategory);

    const userCategoriesPost = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          fk_user_id: aws_id,
          fk_category_id: userCategory,
        }),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    console.log(userCategoriesPost);
    return userCategoriesPost;
  } catch (e) {
    console.log('Error posting a new user category in DB  ', e);
  }
};

export const deleteUser = async (aws_id: string) => {
  try {
    console.log('trying to delete user with user id: ', aws_id);

    const userToDelete = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/delete_user`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ user_id: aws_id }),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    console.log(userToDelete);
    return userToDelete;
  } catch (e) {
    console.log('Error deleting a user in DB  ', e);
  }
};

export const deleteOneUserCategory = async (aws_id: string, categoryId: number) => {
  try {
    console.log(
      `trying to delete a user categories, user_id ${aws_id}, categoryId: ${categoryId}`
    );

    const userToDelete = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/delete_user_category`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          fk_user_id: aws_id,
          fk_category_id: categoryId,
        }),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    console.log(userToDelete);
    return userToDelete;
  } catch (e) {
    console.log('Error deleting a category in DB  ', e);
  }
};

export const deleteAllUserCategories = async (aws_id: string) => {
  try {
    console.log('trying to delete all user categories: ', aws_id);

    const categoriesToDelete = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/delete_all_user_categories`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ fk_user_id: aws_id }),
        headers: {
          'Content-type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
    console.log(categoriesToDelete);
    return categoriesToDelete;
  } catch (e) {
    console.log('Error deleting all categories in DB  ', e);
  }
};































