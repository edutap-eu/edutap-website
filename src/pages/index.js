import * as React from "react";
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import Hero from "../components/hero";
import Team from "../components/team";

const IndexPage = () => {
  const sectionClass =
    "flex flex-col !px-8 items-center md:flex-row justify-between section";
  const imageClass =
    "w-[280px] h-[280px] md:w-[320px] md:h-[320px]  lg:w-[500px] lg:h-[500px] object-scale-down mb-10";

  return (
    <Layout>
      <Hero />
      <div className={"[&>*:nth-child(even)]:bg-base-200"}>
        <div>
          <section className={sectionClass}>
            <div>
              <StaticImage
                src="../images/mission.png"
                alt=""
                className={imageClass}
              />
            </div>
            <div className={"md:max-w-[450px] md:order-first"}>
              <h2 className={"text-center md:text-left"}>Mission</h2>
              <div className={""}>
                <p className={"md:w-full"}>
                  We are developing the digital campus card of the future for
                  the smartphone. For every member of the higher education
                  community, students, faculty, staff and affiliates. It enables
                  you to easily access services by tapping. Our mission is to
                  fulfill the interoperability vision of the European Student
                  Card. eduTAP is your educational ID and a collection of
                  service passes in the digital wallet. It enables you to:
                </p>
                <ul className="list-disc mt-2 ml-6">
                  <li>tap to identify yourself,</li>
                  <li>tap to claim a discount,</li>
                  <li>tap to pay,</li>
                  <li>tap to open a door,</li>
                  <li>tap to lend a book,</li>
                  <li>tap to take a campus shuttle.</li>
                </ul>
                <p><center>no app, <strong>just tap</strong>!</center></p>
              </div>
            </div>
          </section>
        </div>
        <div>
          <section className={sectionClass}>
            <div>
              <StaticImage
                src="../images/features.png"
                alt=""
                className={imageClass}
              />
            </div>
            <div className={"md:max-w-[450px]"}>
              <h2 className={"text-center md:text-left"}>Features</h2>
              <h3 className={"block mb-2 font-bold"}>For users</h3>
              <ul className="list-disc mt-2 ml-6">
                <li>easily obtaining passes for specific services</li>
                <li>ensure secure and respecting privacy</li>
              </ul>
              <h3 className={"block mt-6 mb-2 font-bold"}>For Service Providers</h3>
              <ul className="list-disc mt-2 ml-6">
                <li>
                  a secure and trustworthy solution to validate student status
                </li>
              </ul>
            </div>
          </section>
        </div>
        <div>
          <section className={sectionClass}>
            <div>
              <StaticImage
                src="../images/members.png"
                alt=""
                className={imageClass}
              />
            </div>
            <div className={"md:max-w-[450px] md:order-first"}>
              <h2 className={"text-center md:text-left"}>Project Goals</h2>
              <ul className="list-disc mt-2 ml-6">
                <li>for Europe and the world,</li>
                <li>decentralized, secure and state-of-the-art,</li>
                <li>compliant (e.g. GDPR, vendor-neutral),</li>
                <li>updates are easily possible,</li>
                <li>accessible,</li>
                <li>follow European jurisdiction requirements,</li>
                <li>community-governed free and open-source software,</li>
                <li>favourable adaption possible.</li>
              </ul>
            </div>
          </section>
        </div>
        <div>
          <section
            className={"flex flex-col !px-0 items-center md:flex-row section"}
          >
            <div>
              <StaticImage
                src={"../images/team.png"}
                alt={""}
                className={
                  "w-[280px] h-[280px] md:hidden lg:block lg:w-[400px] lg:h-[511px] object-scale-down mb-10"
                }
              />
            </div>
            <div className={"mx-auto"}>
              <h2 className={"!text-center"}>Project Team</h2>
              <Team />
              <div className={""}>
                <p>Become a contributing member</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default IndexPage;
export { default as Head } from "../components/head";
