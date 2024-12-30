const Bathroom = () => {
  const bathOptions = [
    { id: "yany", label: "Any" },
    { id: "yoneplus", label: "1+" },
    { id: "ytwoplus", label: "2+" },
    { id: "ythreeplus", label: "3+" },
    { id: "yfourplus", label: "4+" },
    { id: "yfiveplus", label: "5+" },
  ];

  return (
    <>
      {bathOptions.map((option, index) => (
        <div className="selection" key={option.id}>
          <input
            id={option.id}
            name="bathrooms"
            type="radio"
            defaultChecked={index === 0} // Only first option is defaultChecked
          />
          <label htmlFor={option.id}>{option.label}</label>
        </div>
      ))}
    </>
  );
};

export default Bathroom;
