import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import SellPropertyExplore from "../component/SellPropertyExplore";
import DataForm from "../component/DataForm";
import SellPropertyImage from "../component/images/sell-property2.jpg";
import Image from "next/image";

export const metadata = {
  title: "SellProperty   || Homez - Real Estate NextJS Template",
};

const SellProperty = () => {

  return (
    <div>
      <DefaultHeader />

      <MobileMenu />

      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">Sell Property</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Sell Property</a>
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
                  Green Realtors is a trusted name in the realty sector of Chikmagalur (Karnataka).
                  We are successfully serving as a property seller, assisting the property owners to sell their property
                  in a hassle-free manner. We strive to help in the fast sale of the property at the best price possible
                  in the region. We bring in a large number of prospective buyers who are capable of paying the best
                  price for the property, thus assuring maximum visibility for the property. We assist our clients
                  at each step of the sale, ensuring that they face no hassles and sell their property with ease. So,
                  whenever you need assistance to sell your property, just avail our services.
                </p>
              </div>
              <div className="col-md-6">
                <Image
                  src={SellPropertyImage}
                  alt="Real Estate"
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
            <SellPropertyExplore />
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </div>
  );
};

export default SellProperty;
