"use client";
import { useSelector } from "react-redux";
import Select from "react-select";

const Location = () => {
  const { location, loading } = useSelector((state) => state.location);

  // Extract unique cities based on `_id`
  const locationOptions = location
    ?.map((state) =>
      state.cities.map((city) => ({
        id: city._id, // Include `_id` for uniqueness
        value: city.name,
        label: city.name,
      }))
    )
    .flat() // Flatten the array
    .filter((city, index, self) =>
      index === self.findIndex((c) => c.id === city.id) // Keep only unique `_id`
    ) || [];

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
          // defaultValue={[locationOptions[2]]}
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
