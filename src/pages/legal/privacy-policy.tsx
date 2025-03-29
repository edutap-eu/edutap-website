import * as React from "react";
import { Layout } from "@/components/layout";
import { Container } from "@/components/container";

const PrivacyPolicyPage = () => (
  <Layout>
    <Container size="md" as="section" className="prose py-12 md:py-36">
      <h1 className="bg-white text-5xl font-bold tracking-tight mb-12">
        Privacy Policy
      </h1>
      <h2>Hosting</h2>
      <p>
        The Websites:
        <ul>
          <li>
            <a href="https://eduTAP.eu/">eduTAP.eu</a>
          </li>
          <li>
            <a href="https://docs.eduTAP.eu/">docs.eduTAP.eu</a>
          </li>
        </ul>
        are hosted via GitHub Pages on GitHub / Microsoft Servers to make our
        websites available.
      </p>
      <h3>Contact Address of Hoster</h3>
      <address>
        GitHub Inc.
        <br />
        88 Colin P Kelly Jr St
        <br />
        San Francisco, CA 94107
        <br />
        United States
      </address>
      <h2>Collected and Processed Data</h2>
      <p>
        Our hoster collects the following data in so-called log files, which
        your browser transmits:
      </p>
      <p>
        IP address, the address of the previously visited website (referer
        request header), date and time of the request, time zone difference to
        Greenwich Mean Time, content of the request, HTTP status code, amount of
        data transferred, website from which the request came and information
        about the browser and operating system.
      </p>
      <p>
        This is necessary to display our website and to ensure stability and
        security. This corresponds to our legitimate interest within the meaning
        of{" "}
        <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng">
          Art. 6 para. 1 p. 1 lit. f GDPR
        </a>
        .
      </p>
      <p>
        There is no active tracking and we do not have direct access to log
        data, but only receive an anonymized statistical summary. This includes
        the address of the previously visited page, the frequency of each page
        viewed and the number of unique visitors. We do not combine this data
        with other data.
      </p>
      <p>
        GitHub is the recipient of your personal data. This corresponds to our
        legitimate interest within the meaning of{" "}
        <a href="https://eur-lex.europa.eu/eli/reg/2016/679/oj/eng">
          Art. 6 (1) p. 1 lit. f GDPR
        </a>
        , not to have to maintain a server on our premises ourselves. Server
        location is USA.
      </p>
      <p>
        You can find more information about objection and removal options
        vis-à-vis GitHub at:{" "}
        <a href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-privacy-statement#github-pages">
          Github privacy statement
        </a>
        .
      </p>
      <p>
        You have the right to object to the processing. Whether the objection is
        successful is to be determined in the context of a balancing of
        interests.
      </p>
      <p>
        The data will be deleted as soon as the purpose of the processing ceases
        to apply.
      </p>
      <p>
        The processing of the data provided under this section is not required
        by law or contract. The functionality of the website is not guaranteed
        without the processing.
      </p>
      <p>
        GitHub has implemented compliance measures for international data
        transfers. These apply to all global activities where GitHub processes
        personal data of individuals in the EU. These measures are based on the
        EU Standard Contractual Clauses (SCCs). For more information, please
        visit:{" "}
        <a href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-data-protection-addendum#attachment-1-the-standard-contractual-clauses-processors">
          GitHub Data Protection Addendum
        </a>
        .
      </p>
      <h2>Linked Services</h2>
      <p>
        This website contains links to other services. If you follow these
        links, you should become aware of their terms of service. We link to:
      </p>
      <ul>
        <li>
          <a href="https://github.com">GitHub</a> for documentation and source
          code repositories.
        </li>
      </ul>
    </Container>
  </Layout>
);

export default PrivacyPolicyPage;
export { default as Head } from "@/components/head";
