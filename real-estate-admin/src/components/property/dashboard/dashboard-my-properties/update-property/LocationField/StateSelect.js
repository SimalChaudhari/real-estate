import Select from "react-select";

const customStyles = {
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    backgroundColor: isSelected ? "#eb6753" : isFocused ? "#f3f3f3" : undefined,
    color: isSelected ? "#fff" : "#333",
  }),
};

const StateSelect = ({ states, formData, handleInputChange }) => {
  // Convert `states` to react-select-compatible options
  const stateOptions = states.map((state) => ({
    value: state._id,
    label: state.name,
  }));

  // Get the currently selected state as an option
  const selectedState = stateOptions.find(
    (option) => option.value === formData.state
  );

  return (
    <div className="col-sm-6 col-xl-3">
      <div className="mb20">
        <label className="heading-color ff-heading fw600 mb10">State</label>
        <Select
          options={stateOptions}
          styles={customStyles}
          className="select-custom pl-0"
          classNamePrefix="select"
          value={selectedState} // Set the current selection
          onChange={(selected) =>
            handleInputChange("state", selected ? selected.value : "")
          } // Handle state change
          placeholder="Select State"
        />
      </div>
    </div>
  );
};

export default StateSelect;
