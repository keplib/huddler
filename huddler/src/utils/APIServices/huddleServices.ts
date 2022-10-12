import useSWRImmutable from "swr/immutable";
import { Huddle } from "../../types";
import { fetcher } from "./fetcher";
//GET Functions

export const getAllHuddles = () =>
  useSWRImmutable(
    "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/HuddlesFormatted",
    fetcher
  );
//Returns: Array of Huddle Objects

export const getUsersGoingToHuddle = (huddle_id: number) =>
  useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/usersgoing?huddle-id=${huddle_id}`,
    fetcher
  );
//Returns: Array of UserId & UserName Objects

export const getHuddleById = (huddle_id: number) => {
  useSWRImmutable(
    `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/gethuddle_byid?huddle-id=${huddle_id}`,
    fetcher
  );
};
//Returns: Array of One Huddle object.

export const getHuddleCategories = async (id: number) => {
  try {
    const data = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/categories_of_huddle?huddle-id=${id}`,
      { mode: "cors" }
    );
    console.log(data);
    const res = await data.json();
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
//Returns: Array of CategoryID & CategoryName Objects

//When you post a huddle the post function does not return the id yet, but it can return the date of creation. With that you can use a get to retrieve the id
export const getIdOfHuddleByDateOfCreation = async (created_on: number) => {
  try {
    const data = await fetch(
      `https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newhuddle/date-of-creation?date=${created_on}`,
      {
        mode: "cors",
      }
    );
    const res = await data.json();
    return res;
  } catch (error) {
    console.log("error getting huddle id", error);
  }
};

// Returns: Array of One Object with HuddleID & UserID (author)

// POST Functions

export const postHuddle = async (huddle: Huddle) => {
  try {
    const huddleToPost = await fetch(
      "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newhuddle",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(huddle),
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Methods": "*",
          Connection: "keep-alive",
          "Content-Length": "7",
          "x-amzn-RequestId": "bca54815-8c5e-4cc9-bf8d-caa420fee8cf",
          "x-amz-apigw-id": "Z5pwWH2dCGYF2Rw=",
          "XAmzn-Trace-Id":
            "Root=1-6346f002-54116ed0323416e4273584fa;Sampled=0",
        },
      }
    );
    // console.log(huddleToPost.status);

    // const test = await huddleToPost.json();
    // console.log(test);

    return huddleToPost;
  } catch (e) {
    console.log("Error posting a Huddle in DB  ", e);
  }
};

export const postHuddleCategory = async (huddleId: number, catId: number) => {
  try {
    console.log("trying to post huddle category", huddleId, catId);

    const huddleToPost = await fetch(
      "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/huddle_category",
      {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ FK_huddle_id: huddleId, FK_category_id: catId }),
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(huddleToPost);

    return huddleToPost;
  } catch (e) {
    console.log("Error posting a Huddle category in DB  ", e);
  }
};
