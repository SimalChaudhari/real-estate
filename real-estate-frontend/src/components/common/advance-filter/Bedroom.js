const Bedroom = () => {
  const bedOptions = [
    { id: "xany", label: "Any" },
    { id: "xoneplus", label: "1+" },
    { id: "xtwoplus", label: "2+" },
    { id: "xthreeplus", label: "3+" },
    { id: "xfourplus", label: "4+" },
    { id: "xfiveplus", label: "5+" },
  ];

  return (
    <>
      {bedOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            name="bedrooms"
            type="radio"
            defaultChecked={index === 0} // Only first option is defaultChecked
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bedroom;