"use client";
import { useSelector } from "react-redux";
import Select from "react-select";

const LookingFor = () => {
  const listingsData = useSelector((state) => state.listings?.listings);
  
  const uniquePropertyTypes = [
    ...new Set(listingsData?.map((item) => item.propertyType)),
  ];

  // Transform unique property types to catOptions format
  const inqueryType = uniquePropertyTypes.map((type) => ({
    value: type,
    label: type,
  }));

  // const inqueryType = [
  //   { value: "Apartments", label: "Apartments" },
  //   { value: "Bungalow", label: "Bungalow" },
  //   { value: "Houses", label: "Houses" },
  //   { value: "Office", label: "Office" },
  //   { value: "TownHome", label: "TownHome" },
  //   { value: "Villa", label: "Villa" },
  // ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      background: "none",
    }),
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };
  return (
    <div>
      <Select
        defaultValue={[inqueryType[0]]}
        name="colors"
        options={inqueryType}
        styles={customStyles}
        className="text-start select-borderless"
        classNamePrefix="select"
        required
        isClearable={false}
      />
    </div>
  );
};

export default LookingFor;
