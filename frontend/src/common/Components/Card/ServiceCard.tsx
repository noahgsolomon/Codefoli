import React, { useState } from "react";
import { ServiceData } from "Type/Services.tsx";
import UserData from "Type/UserData.tsx";

import {
  removeService,
  updateService,
} from "Components/Sections/Skill/skillapi.tsx";

const ServiceCard: React.FC<{
  imageUrl?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
  preview?: boolean;
  setUserData?: React.Dispatch<React.SetStateAction<UserData>>;
  userData?: UserData;
}> = ({
  imageUrl,
  title,
  description,
  children,
  preview = true,
  setUserData,
  userData,
}) => {
  const [hovered, setHovered] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);

  return (
    <div
      className="card group relative mb-5 flex max-w-[400px] cursor-pointer flex-col rounded-2xl border-2 border-black shadow-custom transition-all hover:-translate-y-0.5 hover:shadow-customHover"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={`absolute inset-0 z-10 bg-red-500 ${
          removeHover ? "opacity-20" : "hidden"
        }`}
      />

      <button
        className={`${
          hovered && !preview ? "opacity-100" : "hidden"
        } absolute -right-3 -top-3 z-20 rounded-2xl bg-red-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onMouseEnter={() => setRemoveHover(true)}
        onMouseLeave={() => setRemoveHover(false)}
        onClick={async () => {
          if (setUserData && userData) {
            const removeServiceFetch = await removeService(
              title.replaceAll(" ", "_")
            );
            if (removeServiceFetch.status === "OK") {
              setUserData((prev) => ({
                ...prev,
                services: prev.services.filter(
                  (service) => service !== title.replaceAll(" ", "_")
                ),
              }));
            }
          }
        }}
      >
        -
      </button>
      <button
        className={`${
          hovered && !preview && setUserData ? "opacity-100" : "hidden"
        } absolute -right-3 top-12 z-10 rounded-2xl bg-blue-500 px-5 font-bold text-white transition-all hover:-translate-y-0.5 hover:scale-105`}
        onClick={async () => {
          if (setUserData && userData) {
            const currentServices = userData.services;
            const serviceKeys = Object.keys(ServiceData);
            let randomKey =
              serviceKeys[Math.floor(Math.random() * serviceKeys.length)];
            while (currentServices.includes(randomKey)) {
              randomKey =
                serviceKeys[Math.floor(Math.random() * serviceKeys.length)];
            }
            const newServices = currentServices.map((service) =>
              service === title.replaceAll(" ", "_") ? randomKey : service
            );
            const fetchData = await updateService(
              title.replaceAll(" ", "_"),
              randomKey
            );
            if (fetchData.status === "OK") {
              setUserData((prev) => ({ ...prev, services: newServices }));
            }
          }
        }}
      >
        ↻
      </button>

      {imageUrl && (
        <div className="img-wrapper relative h-[250px] overflow-hidden rounded-t-lg">
          <img
            className={`inline-block h-full w-full transform object-contain transition-all ease-in-out ${
              hovered ? "scale-105" : ""
            }`}
            src={imageUrl}
            alt=""
          />
        </div>
      )}
      <div className="content rounded-2xl bg-white p-5">
        <h2 className="title text-2xl font-bold">{title}</h2>
        <p className="description text-base">{description}</p>
      </div>
      {children}
      <div className="flex-grow rounded-2xl bg-white"></div>
    </div>
  );
};

export default ServiceCard;
