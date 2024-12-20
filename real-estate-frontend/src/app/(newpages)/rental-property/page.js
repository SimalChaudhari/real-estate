import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import RentalPropertyExplore from "../component/RentalPropertyExplore";
import DataForm from "../component/DataForm";
import RentalPropertyImage from "../component/images/rental-property.jpg";
import Image from "next/image";

export const metadata = {
  title: "RentalProperty   || Homez - Real Estate NextJS Template",
};

const RentalProperty = () => {

  return (
    <div>
      <DefaultHeader />

      <MobileMenu />

      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Rental Property</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Rental Property</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="our-faq pb90 pt-0">
        <div className="container">
          <div className="row wow fadeInUp" data-wow-delay="300ms">

            <div className="row  mt-4">
              <div className="col-md-6 ">
                <p className="text">
                  Green Realtors is a promising name in the real estate industry
                  providing the finest property for rent to the clients.
                  We are Chikmagalur (Karnataka) based company offering rental
                  property across the region in prime locations. We can be approached
                  for renting both the residential and commercial properties.
                  The offered rental properties are well-furnished and spacious
                  and are available with all modern-day comforts. Besides,
                  our team members remain in close contact with the clients
                  to determine their requirements and render these property
                  rental services accordingly. We at Green Realtors are giving
                  you a great opportunity for renting your desired property
                  at a very budget-friendly price.
                </p>
              </div>
              <div className="col-md-6">
                <Image
                  src={RentalPropertyImage}
                  alt="Rental Property"
                  className="img-fluid rounded"
                />
              </div>
            </div>
            {/* End .col-lg-12 */}
          </div>
        </div>
      </section>


      <section className="our-faq pb90 pt-0">

        <DataForm />
      </section>

      <section className="pb90 pb30-md bgc-thm-light">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 m-auto wow fadeInUp"
              data-wow-delay="300ms"
            >
              <div className="main-title text-center">
                <h2 className="title">Explore More Services</h2>
                <p className="paragraph">
                  Aliquam lacinia diam quis lacus euismod
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <RentalPropertyExplore />
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </div>
  );
};

export default RentalProperty;
