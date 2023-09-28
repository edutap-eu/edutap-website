import * as React from "react"
import Layout from "../components/layout";
import {StaticImage} from "gatsby-plugin-image";
import Hero from "../components/hero";
import Team from "../components/team";


const IndexPage = () => {
    const sectionClass = 'flex flex-col !px-8 items-center md:flex-row justify-between section'
    const imageClass = 'w-[250px] h-[250px] md:h-[350px] md:w-[350px] lg:w-[500px] lg:h-[500px] object-scale-down mb-10'

    return (
        <Layout>
            <Hero/>
            <div className={'[&>*:nth-child(even)]:bg-base-200'}>
                <section className={sectionClass}>
                    <div>
                        <StaticImage src='../images/mission.png' alt='' className={imageClass}/>
                    </div>
                    <div className={'md:max-w-[450px] md:order-first'}>
                        <h2>Mission</h2>
                        <div className={''}>
                            <p className={'md:w-full'}>
                                We are developing the digital campus card of the future for the smartphone.
                                For every member of the higher education community, students, faculty, staff and
                                affiliates. It enables you to easily access services by tapping. Our mission is
                                to fulfill the interoperability vision of the European Student Card. eduTAP is
                                your educational ID and a collection of service passes in the digital wallet. It
                                enables you to:
                            </p>
                            <ul className='list-disc mt-2 ml-6'>
                                <li>tap to identify yourself,</li>
                                <li>tap to claim a discount,</li>
                                <li>tap to pay,</li>
                                <li>tap to open a door,</li>
                                <li>tap to lend a book,</li>
                                <li>tap to take a campus shuttle.</li>
                            </ul>
                        </div>
                    </div>
                </section>
                <div>
                    <section
                        className={sectionClass}>
                        <div>
                            <StaticImage src='../images/features.png' alt='' className={imageClass}/>
                        </div>
                        <div className={'md:max-w-[450px]'}>
                            <h2>Features</h2>
                            <span className={'block mb-2 font-bold'}>For users</span>
                            <ul className='list-disc mt-2 ml-6'>
                                <li>easily obtaining passes for specific services</li>
                                <li>ensure secure and respecting privacy</li>
                            </ul>
                            <span className={'block mt-6 mb-2 font-bold'}>For Service Providers</span>
                            <ul className='list-disc mt-2 ml-6'>
                                <li>a secure and trustworthy solution to validate student status</li>
                            </ul>
                        </div>
                    </section>
                </div>
                <section className={sectionClass}>
                    <div>
                        <StaticImage src='../images/members.png' alt='' className={imageClass}/>
                    </div>
                    <div className={'md:max-w-[450px] md:order-first'}>
                        <h2>Project Goals</h2>
                        <ul className='list-disc mt-2 ml-6'>
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
                <div>
                    <section className={'flex flex-col !px-0 items-center md:flex-row justify-between section'}>
                        <div>
                            <StaticImage src={'../images/team.png'} alt={''} className={imageClass}/>
                        </div>
                        <div className={'md:max-w-[450px]'}>
                            <h2 className={'!text-center'}>Team</h2>
                            <Team/>
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default IndexPage
export {default as Head} from '../components/head';
