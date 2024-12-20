import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import BuyingPropertyExplore from "../component/BuyingPropertyExplore";
import DataForm from "../component/DataForm";
import BuyingPropertyImage from "../component/images/buying-property.jpg";
import Image from "next/image";

export const metadata = {
  title: "BuyingProperty   || Homez - Real Estate NextJS Template",
};

const BuyingProperty = () => {

  return (
    <div>
      <DefaultHeader />

      <MobileMenu />

      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Buying Property</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Buying Property</a>
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
                  When it comes to buying property in Chikmagalur(Karnataka),
                  there is no one better to guide you than Green Realtors.
                  We are a reliable firm in the domain and engaged in assisting our
                  clients in buying property which is the most feasible in terms of
                  location as well as price. Dealing in all types of commercial properties
                  and residential properties, we can help our clients in purchasing, flats,
                  apartments, individual houses, builder floors, residential plots, commercial
                  plots, farmhouses, etc. at the best price.
                </p>
                <p className="text">
                  With the help of our top-notch network and a vast database,
                  we are able to keep a tab on a number of properties available
                  for sale and therefore provide our clients with a wide choice.
                  We strive to help our clients obtain the complete worth of their
                  money by investing in the right place. If you are looking for buying
                  properties in Chikmagalur (Karnataka), turn to our services.
                </p>
              </div>
              <div className="col-md-6">
                <Image
                  src={BuyingPropertyImage}
                  alt="Real Estate"
                  className="img-fluid rounded"
                />
              </div>
            </div>
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
            <BuyingPropertyExplore />
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </div>
  );
};

export default BuyingProperty;
