import React, { useEffect, useRef, useState } from "react";
import { Huddle } from "../../types";
import { nowFormatted } from "../../utils/helperFunctions";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/APIServices/fetcher";
import TagList from "../TagList";
import AutocompleteHuddleForm from "./AutocompleteNewHuddleForm";

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
};
const NewHuddleForm = ({ data, setCenter }: Props) => {
  const router = useRouter();
  const [imageSelected, setImageSelected] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [addedCategories, setAddedCategories] = useState([{ id: 0, name: "" }]);
  const [allCategories, setAllCategories] = useState([{ id: 0, name: "" }]);
  const [error, setError] = useState("");
  const [locationData, setLocationData] = useState({
    name: "",
    lat: "41.39",
    lng: "2.154",
  });
  const titleRef = useRef<HTMLInputElement>(null);
  const categoriesRef = useRef<HTMLInputElement>(null);
  const whereRef = useRef<HTMLInputElement>(null);
  const whenRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");

      const newHuddle: Huddle = {
        name: titleRef.current!.value,
        day_time: whenRef.current!.value,
        longitude: +locationData.lng,
        latitude: +locationData.lat,
        address: locationData.name,
        // for images we'll probably have to split what comes from the input field
        //CHANGE THIS DEFAULT VALUE TO ACTUAL INPUT
        description: descriptionRef.current!.value,
        image: "https://tall.life/wp-content/uploads/2015/12/6foot9inches.jpg",
        date_of_creation: Date.now(),
        link: "",
        fk_author_id: 2, //here we'll require the uid from the authentication
      };
      //Post huddle in DB
      const data = await fetch(
        "https://u4pwei0jaf.execute-api.eu-west-3.amazonaws.com/test/newhuddle",
        {
          method: "POST",
          mode: "no-cors",
          // credentials: "include",
          body: JSON.stringify(newHuddle),
          headers: {
            "Content-type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      const huddleId = await data.json();
      //posting the categories to new huddle
      // addedCategories.forEach((el) => {
      //   fetcher("https://jsonplaceholder.typicode.com/posts", {
      //     method: "POST",
      //     credentials: "include",
      //     body: JSON.stringify({ huddleId, categoryId: el.id }),
      //     headers: {
      //       "Content-type": "application/json",
      //     },
      //   });
      // });
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

  const addCategory = (category: { id: number; name: string }) => {
    if (addedCategories.includes(category)) return;
    addedCategories[0].name == ""
      ? setAddedCategories([category])
      : setAddedCategories([...addedCategories, category]);
    console.log("These are the selected categories,", huddleCategories);
  };
  useEffect(() => {
    setCenter({
      lat: Number(locationData.lat),
      lng: Number(locationData.lng),
    });
  }, [locationData]);
  return (
    <main className="w-[100%]">
      <h1 className="text-center">Let's make a new huddle</h1>
      {error && <div className="bg-red-600">{error}</div>}

      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          className="border-solid border-2 border-black-600"
          ref={titleRef}
          type="text"
          id="title"
          autoComplete="on"
          required
        />
        <label htmlFor="categories">Pick the tags of your huddle</label>
        {allCategories[0] ? (
          <div className="absolute ml-[95%] mt-[22%] w-[22rem] bg-white p-2 rounded-sm shadow-sm">
            <ul className="grid grid-cols-3 gap-2">
              {allCategories.map((category, i) => (
                <li
                  key={i}
                  className="text-xl shadow-sm bg-blue-600 px-3 h-9 rounded-sm text-white hover:scale-105  cursor-pointer active:translate-y-[2px] active:translate-x-[1px] focus:ring focus:ring-blue-300"
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
        <div className="my-3">
          <ul className="grid grid-cols-3 gap-2">
            {addedCategories.map((category, i) => {
              return (
                <li
                  key={i}
                  className="cursor-pointer bg-slate-200 pl-1 rounded-sm"
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
        <label htmlFor="where">Where?</label>
        <AutocompleteHuddleForm
          stockValue={data.name}
          locationData={locationData}
          setLocationData={setLocationData}
        />
        <label htmlFor="when">When?</label>
        <input
          className="border-solid border-2 border-black-600"
          ref={whenRef}
          type="datetime-local"
          id="dateTime"
          autoComplete="on"
          min={nowFormatted()}
          required
        />
        <label htmlFor="description">What is your huddle?</label>
        <textarea
          className="border-solid border-2 border-black-600"
          ref={descriptionRef}
          id="description"
          autoComplete="on"
          placeholder="Add a description"
          required
        />
        <div className="flex">
          <div className="flex flex-col">
            <label htmlFor="images">
              Do you want images to show in your huddle?
            </label>
            <input
              className="border-solid border-2 border-black-600"
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
          className="border-solid border-2 border-black-600 hover:bg-slate-100"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewHuddleForm;
