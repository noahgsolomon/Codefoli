import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from "react";
import { Values, ValuesFormatted } from "Type/Values.tsx";
import AnyPageData from "Type/AnyPageData.tsx";
import { ValueType } from "Type/Section.tsx";
import { addValue } from "Components/Sections/Value/valueapi.tsx";

const AddJobCard: FC<{
  setPageData: Dispatch<SetStateAction<AnyPageData>>;
  details: ValueType;
}> = ({ setPageData, details }) => {
  const [addValueInput, setAddValueInput] = useState(false);
  const [newValue, setNewValue] = useState("");
  const allValues = Values;
  const [matchingValues, setMatchingValues] = useState<string[]>([
    ...allValues,
  ]);
  const handleNewValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewValue(e.target.value);
    const userValues = details.values.map((value) => value.value.toUpperCase());
    const matches = allValues.filter(
      (value) =>
        value.toLowerCase().startsWith(e.target.value.toLowerCase()) &&
        !userValues.includes(value.toUpperCase().replaceAll(" ", "_"))
    );
    setMatchingValues(matches);
  };

  return (
    <div
      className={`${
        addValueInput ? "opacity-100" : "opacity-50"
      } group relative mb-5 flex h-[400px] w-[400px] cursor-pointer flex-col rounded-2xl border-8 border-dashed border-black transition-all hover:-translate-y-0.5 hover:shadow-customHover `}
      onClick={async () => {
        setAddValueInput(true);
      }}
    >
      {addValueInput ? (
        <>
          <div className="relative flex h-full w-full flex-col items-center justify-center">
            <input
              type="text"
              id="values"
              value={newValue}
              className="rounded-xl border-2 border-black p-3 text-center text-black placeholder-black"
              placeholder="Enter value"
              autoFocus={true}
              onChange={(e) => handleNewValueChange(e)}
            />
            {newValue && matchingValues.length > 0 && (
              <div className="absolute top-52 z-10 mt-2 flex max-h-60 w-full flex-col overflow-y-auto overflow-x-hidden pt-5">
                {matchingValues.map((value) => (
                  <div
                    key={value}
                    className="m-1 inline-block cursor-pointer rounded-full border-b border-gray-300 bg-black transition-all hover:-translate-y-0.5 hover:opacity-90"
                    onClick={async () => {
                      const newValue = value.toUpperCase().replaceAll(" ", "_");
                      const addValueFetch = await addValue(newValue);
                      if (addValueFetch.status === "OK") {
                        setPageData((prev) => ({
                          ...prev,
                          sections: prev.sections.map((section) =>
                            section.type === "VALUE" &&
                            "values" in section.details
                              ? {
                                  ...section,
                                  details: {
                                    ...section.details,
                                    values: [
                                      ...section.details.values,
                                      {
                                        value:
                                          addValueFetch.data as ValuesFormatted,
                                      },
                                    ],
                                  },
                                }
                              : section
                          ),
                        }));
                      }
                      setAddValueInput(false);
                      setNewValue("");
                      setMatchingValues([...allValues]);
                    }}
                  >
                    <span className="px-2 text-white">{value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl">Add value</p>
          <p className="text-5xl">+</p>
        </div>
      )}
    </div>
  );
};

export default AddJobCard;
