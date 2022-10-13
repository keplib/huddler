import dayjs from 'dayjs';
import { getHuddlesInCategory } from './APIServices/categoryServices';
import { getUserCategories } from './APIServices/userServices';
export const dateFormatter = (date: number) => {
  const toFormat = dayjs(date);
  const dateTime = {
    day: toFormat.format('DD'),
    month: toFormat.format('MMMM'),
    year: toFormat.format('YYYY'),
    time: toFormat.format('hh:mmA'),
    monthDayYear: toFormat.format('MMMM DD, YYYY'),
  };
  return dateTime;
};

export const nowFormatted = () => {
  return dayjs(Date.now()).format('YYYY-MM-DDTHH:mm');
};

//For now this functions returns all the huddles that are in user categories. Eventually we should do some kind of sorting or also recommend by location. Now we don't have enough huddles in each categories to test it.
export const recommendedForUser = async (userId: number) => {
  const userCategories = await getUserCategories(userId);
  console.log('userCategories', userCategories)
  const promises = userCategories.map((category) => getHuddlesInCategory(category.id));
  const huddlesInCategories = await Promise.all(promises);
  const huddlesInCategoriesArr = huddlesInCategories.reduce(
    (previousValue, currentValue) => [...previousValue, ...currentValue],
    []
  );
  return huddlesInCategoriesArr;
};




