import React, { useEffect, useRef, useState } from "react";
import { Huddle } from "../../types";
import { nowFormatted } from "../../utils/helperFunctions";
import Image from "next/future/image";
import { useRouter } from "next/router";
import { fetcher } from "../../utils/fetcher";
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
  const [addedCategories, setAddedCategories] = useState([""]);
  const [allCategories, setAllCategories] = useState([""]);
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setError("");

      const newHuddle: Huddle = {
        name: titleRef.current!.value,
        createdOn: Date.now(),
        when: locationData.name,
        categories: [], //categoriesRef.current!.value,
        longitude: +locationData.lng,
        latitude: +locationData.lat,
        // for images we'll probably have to split what comes from the input field
        //CHANGE THIS DEFAULT VALUE TO ACTUAL INPUT
        images: [imagesRef.current!.value],
        description: "",
        authorId: 123456, //here we'll require the uid from the authentication
      };
      //Post huddle in DB
      fetcher("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        credentials: "include",
        body: JSON.stringify(newHuddle),
        headers: {
          "Content-type": "application/json",
        },
      });
      //redirect to user home page
      router.replace("/home");
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

  const addCategory = (category: string) => {
    if (addedCategories.includes(category)) return;
    addedCategories[0] == ""
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
                  {category}
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
                  {category}
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
          className="border-solid border-2 border-black-600"
          type="submit"
        >
          Submit
        </button>
      </form>
    </main>
  );
};

export default NewHuddleForm;
