import React, { useState } from "react";
import UserData from "Type/UserData.tsx";
import { Services } from "Type/Services.tsx";

import { changeSkill } from "Components/Sections/Skill/skillapi.tsx";

const AddServiceCard: React.FC<{
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
  userData: UserData;
}> = ({ setUserData, userData }) => {
  const [addServiceInput, setAddServiceInput] = useState(false);
  const [newService, setNewService] = useState("");
  const allServices = Services;
  const [matchingServices, setMatchingServices] = useState<string[]>([
    ...allServices,
  ]);
  const handleNewServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewService(e.target.value);
    const userServices = userData.services;
    const matches = allServices.filter(
      (service) =>
        service.toLowerCase().startsWith(e.target.value.toLowerCase()) &&
        !userServices.includes(
          service
            .toUpperCase()
            .replaceAll(" ", "_")
            .replaceAll("/", "_")
            .replaceAll(".", "_")
            .replaceAll("-", "_")
        )
    );
    setMatchingServices(matches);
  };

  const handleAddService = async (service: string) => {
    const newService = service
      .toUpperCase()
      .replaceAll(" ", "_")
      .toUpperCase()
      .replaceAll(" ", "_")
      .replaceAll("/", "_")
      .replaceAll(".", "_")
      .replaceAll("-", "_");
    const addServiceFetch = await changeSkill({
      type: "service",
      operation: "add",
      value: newService,
    });
    if (addServiceFetch.status === "OK") {
      setUserData((prev) => ({
        ...prev,
        services: [...prev.services, newService],
      }));
    }
    setAddServiceInput(false);
    setNewService("");
    setMatchingServices([...allServices]);
  };

  return (
    <div
      className={`${
        addServiceInput ? "opacity-100" : "opacity-50"
      } group relative mb-5 flex h-[400px] max-w-[400px] cursor-pointer flex-col rounded-2xl border-8 border-dashed border-black transition-all hover:-translate-y-0.5 hover:shadow-customHover `}
      onClick={async () => {
        setAddServiceInput(true);
      }}
    >
      {addServiceInput ? (
        <>
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <input
              type="text"
              id="services"
              value={newService}
              className="rounded-xl border-2 border-black p-3 text-center text-black placeholder-black"
              placeholder="Enter service"
              autoFocus={true}
              onChange={(e) => handleNewServiceChange(e)}
            />
            {newService && matchingServices.length > 0 && (
              <div className="absolute top-52 z-10 mt-2 flex max-h-60 w-full flex-col overflow-y-auto overflow-x-hidden pt-5">
                {matchingServices.map((service) => (
                  <div
                    key={service}
                    className="m-1 inline-block cursor-pointer rounded-full border-b border-gray-300 bg-black transition-all hover:-translate-y-0.5 hover:opacity-90"
                    onClick={async () => await handleAddService(service)}
                  >
                    <span className="px-2 text-white">{service}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl">Add service</p>
          <p className="text-5xl">+</p>
        </div>
      )}
    </div>
  );
};

export default AddServiceCard;
