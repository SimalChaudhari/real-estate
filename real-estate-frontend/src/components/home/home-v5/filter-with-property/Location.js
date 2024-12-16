"use client";
import { useSelector } from "react-redux";
import Select from "react-select";

const Location = () => {
  const { location, loading } = useSelector((state) => state.location);

  // Extracting city data dynamically from the Redux store
  const locationOptions = location?.cities?.map((city) => ({
    value: city.name,
    label: city.name,
  })) || [];

  const inqueryType = [
    { value: "CHIKKAMAGALURU", label: "CHIKKAMAGALURU" },
    { value: "BANGALORE", label: "BANGALORE" },
    { value: "SAKLESHPURA", label: "SAKLESHPURA" },
    { value: "MADIKERI", label: "MADIKERI" },
    { value: "MANGALORE", label: "MANGALORE" },
    { value: "UDUPI", label: "UDUPI" },
  ];

  const customStyles = {
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
      {loading ? (
        // Show loading spinner or message
        <p>Loading locations...</p>
      ) : (
        <Select
          defaultValue={[locationOptions[2]]}
          name="colors"
          options={locationOptions}
          styles={customStyles}
          className="text-start select-borderless"
          classNamePrefix="select"
          required
          isClearable={false}
        />
      )}
    </div>
  );
};

export default Location;
