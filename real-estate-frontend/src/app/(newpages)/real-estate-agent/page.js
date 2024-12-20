import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import Explore from "../component/RealEstateAgentExplore";
import DataForm from "../component/DataForm";
import RealEstateAgentImage from "../component/images/real-estate-agent.jpg";
import Image from "next/image";

export const metadata = {
  title: "RealEstateAgent   || Homez - Real Estate NextJS Template",
};

const RealEstateAgent = () => {

  return (
    <div>
      <DefaultHeader />

      <MobileMenu />

      <section className="breadcumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                <h2 className="title">
                  Real Estate Agent</h2>
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  <a href="#">Real Estate Agent</a>
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
                  Before making an investment in the real estate space in Chikmagalur
                  (Karnataka), do not hesitate in turning to Green Realtors. We are
                  serving as a dependable real estate agent in the industry. We are
                  supported by a team of proficient individuals, who assist us in all
                  major real estate operations. We can be trusted for any type of
                  real estate requirements including, selling property, buying
                  property, renting property, etc.
                </p>
                <p className="text">
                  We help our valuable clients in getting the right property at the
                  right price. We have a list of clients in the region, who have
                  benefited from our offered services. If you want to take advantage
                  of our services, contact us at the given numbers.
                </p>
              </div>
              <div className="col-md-6">
                <Image
                  src={RealEstateAgentImage}
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
            <Explore />
          </div>
        </div>
      </section>

      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
    </div>
  );
};

export default RealEstateAgent;
