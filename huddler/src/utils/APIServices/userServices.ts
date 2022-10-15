import { User } from "../../types";
import { fetcher } from "../helperFunctions";

// GET Functions

export const getAllUsers = async () =>
  await fetcher(
    "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/getusers"
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
  await fetcher(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddles_user_isgoing?user-id=${user_id}`
  );
//Return: Array of Huddle Objects


// POST Functions

export const postUserInfo = async (user: User, userId: number) => {
  try {
    console.log("trying to post huddle category", user, userId);

    const newUserToPost = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newuser/update?user-id=${userId}`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(user),
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(newUserToPost);
    return newUserToPost;
  } catch (e) {
    console.log("Error posting a a new user category in DB  ", e);
  }
};

export const postUserCategory = async (
  userId: number,
  userCategory: number
) => {
  try {
    console.log("trying to post huddle category", userId, userCategory);

    const userCategoriesPost = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/users_categories`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
          fk_user_id: userId,
          fk_category_id: userCategory,
        }),
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(userCategoriesPost);
    return userCategoriesPost;
  } catch (e) {
    console.log("Error posting a new user category in DB  ", e);
  }
};

export const deleteUser = async (userId: number) => {
  try {
    console.log('trying to delete user with user id: ', userId);

    const userToDelete = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/delete_user`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ user_id: userId }),
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

export const deleteOneUserCategory = async (userId: number, categoryId: number) => {
  try {
    console.log(`trying to delete a user categories, user_id ${userId}, categoryId: ${categoryId}`);

    const userToDelete = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/delete_user_category`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ fk_user_id: userId, fk_category_id: categoryId }),
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

export const deleteAllUserCategories = async (userId: number) => {
  try {
    console.log('trying to delete all user categories: ', userId);

    const categoriesToDelete = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/delete_all_user_categories`,
      {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({ fk_user_id: userId }),
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








