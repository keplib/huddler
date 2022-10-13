import React, { useEffect, useRef, useState } from "react";
import { Category, Huddle } from "../../types";
import { nowFormatted } from "../../utils/helperFunctions";
import Image from "next/future/image";
import { useRouter } from "next/router";
import TagList from "../TagList";
import AutocompleteHuddleForm from "./AutocompleteNewHuddleForm";
import {
  getIdOfHuddleByDateOfCreation,
  postHuddle,
  postHuddleCategory,
} from "../../utils/APIServices/huddleServices";

type Props = {
  data: {
    name: string;
    lat: string;
    lng: string;
  };
  setCenter: React.Dispatch<
    React.SetStateAction<{
      lat: number;
      lng: number;
    }>
  >;
  center: {
    lat: number;
    lng: number;
  };
};

const NewHuddleForm = ({ data, setCenter, center }: Props) => {
  const router = useRouter();

  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [addedCategories, setAddedCategories] = useState<Category[]>([
    { id: 0, name: "" },
  ]);
  const [allCategories, setAllCategories] = useState([{ id: 0, name: "" }]);
  const [error, setError] = useState("");
  const [locationData, setLocationData] = useState({
    name: "",
    lat: "41.39",
    lng: "2.154",
  });
  const [finalLocation, setFinalLocation] = useState(locationData);

  const titleRef = useRef<HTMLInputElement>(null);
  const whenRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");
      const date = Date.now();
      const newHuddle: Huddle = {
        name: titleRef.current!.value,
        day_time: whenRef.current!.value,
        longitude: +finalLocation.lng,
        latitude: +finalLocation.lat,
        address: finalLocation.name,
        description: descriptionRef.current!.value,
        // for images we'll probably have to split what comes from the input field
        //CHANGE THIS DEFAULT VALUE TO ACTUAL INPUT
        image: "https://tall.life/wp-content/uploads/2015/12/6foot9inches.jpg",
        date_of_creation: date,
        link: "",
        fk_author_id: 2, //here we'll require the uid from the authentication
      };
      // postHuddle2(newHuddle);
      //Post huddle in DB
      const huddleDateOfCreation = await postHuddle(newHuddle);

      //getting id of huddle
      const huddleId = await getIdOfHuddleByDateOfCreation(date);
      console.log(huddleId);

      //posting the categories to new huddle
      addedCategories.forEach((el) => {
        postHuddleCategory(huddleId[0].id, el.id as number);
      });
      //redirect to user home page
      // router.replace("/home");
    } catch {
      setError("We could not create the huddle");
    }
  };
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImageSelected(true);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  let huddleCategories: string[] = [];

  const addCategory = (category: Category) => {
    if (addedCategories.includes(category)) return;
    addedCategories[0].name == ""
      ? setAddedCategories([category])
      : setAddedCategories([...addedCategories, category]);
    console.log("These are the selected categories,", addedCategories);
  };
  useEffect(() => {
    setCenter({
      lat: Number(locationData.lat),
      lng: Number(locationData.lng),
    });
    setFinalLocation(locationData);
  }, [locationData]);

  useEffect(() => {
    if (center)
      setFinalLocation({
        ...finalLocation,
        lat: "" + center.lat,
        lng: "" + center.lng,
      });
  }, [center]);

  return (
    <main className="w-[100%]">
      <h1 className="text-center text-lg font-medium text-palette-orange mt-0">
        {"Let's make a new huddle"}
      </h1>
      {error && <div className="bg-red-600">{error}</div>}

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className="outline-palette-orange outline-1 shadow-sm rounded-md"
          ref={titleRef}
          type="text"
          id="title"
          autoComplete="on"
          required
        />
        <label htmlFor="categories" className="mt-2">
          Pick the tags of your huddle
        </label>
        {allCategories[0] ? (
          <div className="absolute ml-[95%] mt-[22%] w-[22rem] bg-palette-light p-2 rounded-sm shadow-sm">
            <ul className="grid grid-cols-3 gap-2">
              {allCategories.map((category, i) => (
                <li
                  key={i}
                  className="text-lg font-medium bg-palette-dark py-2 px-2 rounded text-white hover:bg-opacity-60 cursor-pointer"
                  onClick={() => addCategory(category)}
                >
                  {category.name}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
        <div className="my-3 mt-2">
          <ul className="grid grid-cols-3 gap-2">
            {addedCategories.map((category, i) => {
              return (
                <li
                  key={i}
                  className="cursor-pointer bg-white bg-opacity-60 rounded-md text-center"
                  onClick={() =>
                    setAddedCategories(
                      addedCategories.filter((word) => word != category)
                    )
                  }
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </div>
        <TagList setAllCategories={setAllCategories} />
        <label className="mt-2" htmlFor="where">
          Where?
        </label>
        <AutocompleteHuddleForm
          stockValue={data.name}
          locationData={locationData}
          setLocationData={setLocationData}
        />
        <label className="mt-2" htmlFor="when">
          When?
        </label>
        <input
          className="outline-palette-orange outline-1 shadow-sm rounded-md"
          ref={whenRef}
          type="datetime-local"
          id="dateTime"
          autoComplete="on"
          min={nowFormatted()}
          required
        />
        <label className="mt-2" htmlFor="description">
          What is your huddle?
        </label>
        <textarea
          className="outline-palette-orange outline-1 shadow-sm rounded-md"
          ref={descriptionRef}
          id="description"
          autoComplete="on"
          placeholder="Add a description"
          required
        />
        <div className="flex">
          <div className="flex flex-col mt-2">
            <label htmlFor="images">
              Do you want images to show in your huddle?
            </label>
            <input
              className="border-none"
              ref={imagesRef}
              type="file"
              accept=".jpg, jpeg, .png, .gif"
              onChange={onSelectFile}
              id="images"
            />
          </div>
          {imageSelected && (
            <figure>
              <Image
                className="ml-10"
                width={100}
                height={100}
                id="image-preview"
                alt="image-preview"
                src={imagePreview}
              />
            </figure>
          )}
        </div>
        <button
          className="border-none bg-palette-dark hover:bg-opacity-60 rounded-md shadow-md text-white font-medium mt-2"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewHuddleForm;
