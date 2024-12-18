"use client";
import { useSelector } from "react-redux";
import Select from "react-select";

const Area = () => {
  const { location, loading } = useSelector((state) => state.location);

  // Extracting state data dynamically from the Redux store
  const locationOptions = location?.cities?.map((state) => ({
    value: state.stateId,
    label: state.stateId,
  })) || [];

  const inqueryType = [
    { value: "Karnataka", label: "Karnataka" },
    // { value: "Karnataka", label: "Karnataka" },
    // { value: "Karnataka", label: "Karnataka" },
    // { value: "Karnataka", label: "Karnataka" },
    // { value: "Karnataka", label: "Karnataka" },
    // { value: "Karnataka", label: "Karnataka" },
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
          defaultValue={[inqueryType[2]]}
          name="colors"
          options={inqueryType}
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

export default Area;
