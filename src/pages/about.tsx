import * as React from "react";

import {Layout} from "@/components/layout";
import {Container} from "@/components/container";

const AboutPage = () => {
    return (
        <Layout>
            <Container size="md" as="section" className='prose py-12 md:py-36'>
                <h1 className="bg-white text-5xl font-bold tracking-tight mb-12">About</h1>
                <div>
                    <p>
                        Welcome to eduTAP, where "education meets the tap" – inspired by the convenience of modern
                        smartphone interactions like "tap to pay" and "tap to open." Just as you can effortlessly tap
                        your smartphone for various transactions, eduTAP enhances the (inter-)campus experience by
                        enabling university members to use their smartphones for a multitude of campus activities. With
                        specific passes securely stored in their digital wallets, individuals can seamlessly:
                        <ul>
                            <li>Verify their identity</li>
                            <li>Claim discounts</li>
                            <li>Make payments</li>
                            <li>Access buildings</li>
                            <li>Borrow library books</li>
                            <li>Ride campus shuttles</li>
                            <li><i>And much more...</i></li>
                        </ul>
                    </p>
                    <p>
                        eduTAP is committed to realizing the interoperability vision of the European Student Card,
                        establishing a cutting-edge "common identity document" (eduID) based on ISO/IEC standards and
                        dedicated service passes for education institution members. Our mission is to provide a unified
                        way to access on-campus services, all while prioritizing user privacy and complying with
                        European legal requirements. We're proud to align our efforts with Géant Trust and Identity
                        Services, joining the ranks of eduGAIN, eduroam, eduTEAMS, and InAcademia.
                        <br/>
                        <div>
                            <strong>Disclaimer:</strong> eduTAP is currently a project under the
                            "European University Alliance" (EUGLOH) and is not an official Géant Service or Product.
                            We are in the conceptual and pilot phase, with multiple prototypes showcasing how an
                            inter-university campus can offer interoperable services to its members.
                        </div>
                    </p>
                </div>
                <hr/>
                <div>
                    <p>
                        <strong>🎯 Our Goals:</strong> At eduTAP, we are dedicated to achieving the
                        following objectives.
                        <ul>
                            <li>
                                Introduce the European digital campus card on smartphones for both Europe and the world.
                            </li>
                            <li>
                                Ensure decentralization, state-of-the-art security, and compliance with regulations such
                                as GDPR, all while remaining vendor-neutral.
                            </li>
                            <li>Make updates and adaptations easily achievable.</li>
                            <li>Prioritize accessibility and adhere to European jurisdiction requirements.</li>
                            <li>Develop a community-governed, free, and open-source software.</li>
                            <li>Promote favorable adoption of our technology.</li>
                        </ul>
                    </p>
                    <p>
                        <strong>🚫 What We Don't Want:</strong>
                        <ul>
                            <li>We won't clutter your smartphones with additional apps; instead we use existing wallets
                                like Apple Wallet and Google Wallet.
                            </li>
                            <li>We won't introduce new protocols or specifications.</li>
                            <li>We aren't in the business of commercial software.</li>
                            <li>We have no interest in competing with other projects or providers.</li>
                            <li>
                                At eduTAP, we believe in the "Law of Gall" – building upon existing concepts,
                                technologies, and software rather than reinventing the wheel.
                            </li>
                        </ul>
                    </p>
                    <p>
                        <strong>🖼️ Our Initiatives:</strong> Our project is managed with
                        agility, focusing on several key initiatives.
                        <ul className={'mt-2 pl-10 list-disc'}>
                            <li>
                                <strong>eduTAP-Core (Generic):</strong> This component provides the software to create
                                common identity passes and service-specific passes for issuing institutions. It connects
                                with various wallet providers, offers callback applications, and includes a Pass Issuing
                                Management Portal and a Pass Designer.
                            </li>
                            <li>
                                <strong>Central Service Directory:</strong> We manage a system for announcing services
                                within Higher Education Institutes (HEIs) to a central directory, simplifying access to
                                digital passes for these services. A REST API and micro search portals are also part of
                                this initiative.
                            </li>
                            <li>
                                <strong>Mandant Specific Applications (MasA):</strong> HEIs have unique requirements,
                                and we provide support libraries and sample apps to accommodate these differences. These
                                include VAS/Smarttap libraries and ISO/IEC 18013-5 libraries for reading passes, as well
                                as apps for checking student status and course/exam check-ins.
                            </li>
                            <li>
                                <strong>Infrastructure and Deployment:</strong> To facilitate implementation, we offer
                                comprehensive instructions for system administrators. Ready-to-use containers for
                                reusable components are available, compatible with Docker, Kubernetes, and other OCI
                                platforms.
                            </li>
                            <li>
                                <strong>eduTAP Documentation:</strong> Find in-depth documentation about eduTAP, its
                                components, and technologies at{' '}
                                <a href='https://docs.edutap.eu/'>docs.edutap.eu</a>.
                            </li>
                        </ul>
                    </p>
                    <p>
                        Join us on this exciting journey as we tap into the future of education with eduTAP!
                    </p>
                </div>
            </Container>
        </Layout>
    )
}

export default AboutPage;
export {default as Head} from '@/components/head';
