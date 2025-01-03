"use client";
import { useSelector } from "react-redux";
import Select from "react-select";

const Location = ({ onCityChange }) => {
  const { location, loading } = useSelector((state) => state.location);
  console.log("🚀 ~ Location ~ location:", location)

  // Extract unique cities based on `_id`
  const locationOptions = location
    ?.flatMap((state) =>
      state.cities.map((city) => ({
        id: city._id, // Include `_id` for uniqueness
        value: city.name,
        label: city.name,
        areas: city.areas, // Include areas for the selected city
      }))
    )
    .filter((city, index, self) =>
      index === self.findIndex((c) => c.id === city.id) // Keep only unique `_id`
    ) || [];

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => ({
      ...styles,
      backgroundColor: isSelected
        ? "#eb6753"
        : isHovered || isFocused
        ? "#eb675312"
        : undefined,
    }),
  };

  const handleCityChange = (selectedOption) => {
    onCityChange(selectedOption); // Pass the selected city to the parent
  };

  return (
    <div>
      {loading ? (
        <p>Loading locations...</p>
      ) : (
        <Select
          options={locationOptions}
          styles={customStyles}
          className="text-start select-borderless"
          classNamePrefix="select"
          onChange={handleCityChange}
          placeholder="Select City"
          isClearable
        />
      )}
    </div>
  );
};

export default Location;
