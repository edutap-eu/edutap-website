import * as React from "react";
import Layout from "../../components/layout";
import UnderConstruction from "../../components/under-construction";

const PrivacyPolicyPage = () => (
    <Layout>
        <section className="section space-y-4 md:text-lg md:mt-12">
            <h1>Privacy Policy</h1>
            <h2>Hosting</h2>
            <p>Our hoster collects the following data in so-called log files, which your browser transmits:</p>
            <p>
                IP address, the address of the previously visited website (referer request header), date and time of the
                request, time zone difference to Greenwich Mean Time, content of the request, HTTP status code, amount
                of data transferred, website from which the request came and information about the browser and operating
                system.
            </p>
            <p>
                This is necessary to display our website and to ensure stability and security. This corresponds to our
                legitimate interest within the meaning of Art. 6 para. 1 p. 1 lit. f DSGVO.
            </p>
            <p>
                There is no tracking and we do not have direct access to this data, but only receive an anonymized
                statistical summary. This includes the address of the previously visited page, the frequency of each
                page viewed and the number of unique visitors. We do not combine this data with other data.
            </p>
            <p>
                We use the following hoster to make our website available:
            </p>
            <address>
                GitHub Inc.<br/>
                88 Colin P Kelly Jr St<br/>
                San Francisco, CA 94107<br/>
                United States
            </address>
            <p>
                This is the recipient of your personal data. This corresponds to our legitimate interest within the
                meaning of Art. 6 (1) p. 1 lit. f DSGVO, not to have to maintain a server on our premises ourselves.
                Server location is USA.
            </p>
            {/*TODO: add link*/}
            <p>
                You can find more information about objection and removal options vis-à-vis GitHub at:{' '}
                <a className={'link'}
                   href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-privacy-statement#github-pages">
                    Github privacy statement</a>.
            </p>
            <p>
                You have the right to object to the processing. Whether the objection is successful is to be determined
                in the context of a balancing of interests.
            </p>
            <p>
                The data will be deleted as soon as the purpose of the processing ceases to apply.
            </p>
            <p>
                The processing of the data provided under this section is not required by law or contract. The
                functionality of the website is not guaranteed without the processing.
            </p>
            <p>
                GitHub has implemented compliance measures for international data transfers. These apply to all global
                activities where GitHub processes personal data of individuals in the EU. These measures are based on
                the EU Standard Contractual Clauses (SCCs). For more information, please visit:{' '}
                <a className={'link'}
                   href="https://docs.github.com/en/free-pro-team@latest/github/site-policy/github-data-protection-addendum#attachment-1-the-standard-contractual-clauses-processors">
                    GitHub Data Protection Addendum</a>.
            </p>
            <h2 className={'!mt-12'}>Linked Services</h2>
            <p>This website contains links to other services. If you follow these links, you should become aware of
                their terms of service. We link to:</p>
            <ul className={'list-disc ml-4'}>
                <li><a className={'link'} href="https://github.com">GitHub</a> for documentation and source code
                    repositories.
                </li>
            </ul>
        </section>
    </Layout>
);

export default PrivacyPolicyPage;