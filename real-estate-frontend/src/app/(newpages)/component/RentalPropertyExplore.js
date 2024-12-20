import Image from "next/image";
import Link from "next/link";

const RentalPropertyExplore = () => {
  // Array of iconbox data
  const iconboxData = [
    {
      id: 1,
      icon: "/images/icon/property-sell.svg",
      title: "Sell a property",
      text: "Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.",
      linkText: "Read More",
      link: "/sell-property",
    },
    {
      id: 2,
      icon: "/images/icon/property-buy.svg",
      title: "Buy a property",
      text: "Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.",
      linkText: "Read More",
      link: "/buying-property",
    },
    {
      id: 3,
      icon: "/images/icon/new-york.svg",
      title: "Real Estate Agent",
      text: "Nullam sollicitudin blandit eros eu pretium. Nullam maximus ultricies auctor.",
      linkText: "Read More",
      link: "/real-estate-agent",
    },
  ];

  return (
    <>
      {iconboxData.map((item) => (
        <div
          className="col-sm-6 col-lg-4"
          key={item.id}
          data-aos="fade-up"
          data-aos-delay={(item.id + 1) * 100} // Increase delay for each item
        >
          <div className="iconbox-style2 text-center">
            <div className="icon">
              <Image width={150} height={150} src={item.icon} alt="icon" />
            </div>
            <div className="iconbox-content">
              <h4 className="title">{item.title}</h4>
              <p className="text">{item.text}</p>
              {/*
                <Link href="/grid-default" className="ud-btn btn-white2">
                */}
              <Link href={item.link} className="ud-btn btn-white2">
                {item.linkText}
                <i className="fal fa-arrow-right-long" />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RentalPropertyExplore;
