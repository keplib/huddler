import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/future/image";
import { Huddle, User } from "../../src/types";
import { dateFormatter } from "../../src/utils/helperFunctions";
import { getUsersGoingToHuddle } from "../../src/utils/APIServices/huddleServices";
import { getUserById } from "../../src/utils/APIServices/userServices";

const Details = () => {
  const [users, setUsers] = useState<any>();
  const [creator, setCreator] = useState<User>();
  const huddle: Huddle = useRouter().query;

  const dateTime = dateFormatter(huddle.day_time);
  const getter = async () => {
    const usersGoingTo = await getUsersGoingToHuddle(huddle.id);
    setUsers(usersGoingTo);
    const createdBy = await getUserById(huddle.fk_author_id);
    setCreator(createdBy[0]);
  };
  useEffect(() => {
    getter();
  }, []);
  return (
    <div className="flex">
      <div
        id="huddle-details"
        className="h-screen w-[19rem] px-8 py-6 pb-0 mt-12 bg-white bg-opacity-20 shadow-xl"
      >
        <p className="text-4xl font-extrabold text-palette-orange">
          {huddle.name}
        </p>
        <p>
          {" "}
          {dateTime.monthDayYear} at {dateTime.time}
        </p>
        <Image
          src={huddle.image}
          width={500}
          height={500}
          className="rounded-lg h-[13rem] w-[18rem] my-4"
          alt={huddle.name}
        />{" "}
        <p className="text-lg mb-2">{huddle.description}</p>
        <p>{huddle.address}</p>
        <p className="mt-4">Created By: {creator?.username}</p>
        <p className="my-2">Who's going:</p>
        {/* {users ? (
          users.map((user: any) => {
            return <p className="cursor-pointer mb-1">{user.username}</p>;
          })
        ) : (
          <></>
        )} */}
      </div>
      <div id="huddle-chat" className="grid grid-cols-1 w-full mb-24">
        <div className="border border-palette-orange mx-14 my-24 p-4 rounded-2xl bg-white bg-opacity-20 relative">
          <div>
            <ul>
              <li>hello</li>
              <li>hi</li>
            </ul>
          </div>
          <div>
            <input
              type="text"
              className="absolute inset-x-0 bottom-0 mb-6 rounded-xl h-12 w-full"
            ></input>
            <button>Enter</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
