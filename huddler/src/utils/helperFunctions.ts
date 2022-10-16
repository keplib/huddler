import { Auth } from "aws-amplify";
import dayjs from "dayjs";
import { Category } from "../types";
import { getHuddlesInCategory } from "./APIServices/categoryServices";
import { getUserCategories } from "./APIServices/userServices";

// 1. Fetcher
// 2. Recommended Huddles
// 3. Dates handler
// 4. Sort by name, any array of objects that contains the field name

// 1. Fetcher
export const fetcher = async (...args: string[]) => {
  try {
    // @ts-ignore
    const data = await fetch(...args);
    return await data.json();
  } catch (e) {
    console.log("There has been an error fetching data: ", e);
    return e;
  }
};

// 2. Recommended Huddles

//For now this functions returns all the huddles that are in user categories. Eventually we should do some kind of sorting or also recommend by location. Now we don't have enough huddles in each categories to test it.
export const recommendedForUser = async (aws_id: string) => {
  const userCategories = await getUserCategories(aws_id);
  const promises = userCategories.map((category: Category) =>
    getHuddlesInCategory(category.id as number)
  );
  const huddlesInCategories = await Promise.all(promises);
  const huddlesInCategoriesArr = huddlesInCategories.reduce(
    (previousValue, currentValue) => [...previousValue, ...currentValue],
    []
  );
  return huddlesInCategoriesArr;
};

// 3. Dates handler
export const dateFormatter = (date: string) => {
  const toFormat = dayjs(date);
  const dateTime = {
    day: toFormat.format("DD"),
    month: toFormat.format("MMMM"),
    year: toFormat.format("YYYY"),
    time: toFormat.format("hh:mmA"),
    monthDayYear: toFormat.format("MMMM DD, YYYY"),
  };
  return dateTime;
};

export const nowFormatted = () => {
  return dayjs(Date.now()).format("YYYY-MM-DDTHH:mm");
};

// 4. Sort by name
export const sortByName = (arrOfObj) => {
  return arrOfObj.sort((a, b) => a.name.localeCompare(b.name));
};

export const getSession = async () => {
  const res = await Auth.currentAuthenticatedUser();
  return res.CognitoUser.username;
};
