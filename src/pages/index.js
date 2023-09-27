import * as React from "react"
import Layout from "../components/layout";
import {StaticImage} from "gatsby-plugin-image";
import Hero from "../components/hero";
import Team from "../components/team";


const IndexPage = () => {
    return (
        <Layout>
            <Hero/>
            <section className='flex justify-between section'>
                <StaticImage src='../images/mission.png' alt='' height={500} style={{height: '500px'}}/>
                <div className={'w-[600px] order-first'}>
                    <h1>Mission</h1>
                    {/* TODO: Introduction & Goals */}
                    <p>We are developing the digital campus card of the future for the smartphone.</p>
                    <p>It enables you to easily access services by tapping.</p>
                    <p>Our mission is to fulfill the interoperability vision of the European Student Card.</p>
                    <p>eduTAP is your educational ID and a collection of service passes in the digital wallet.
                       It enables you to tap to identify yourself, tap to claim a discount, tap to pay, tap to open a door, tap to lend a book, tap to take a campus shuttle.</p>
                </div>
            </section>
            <section className='flex section bg-base-200'>
                <StaticImage src='../images/features.png' alt='' height={500} style={{height: '500px'}}/>
                <div className={'w-[600px] ml-32'}>
                    <h1>Features</h1>
                    {/*  TODO: Features  */}
                    <p>
                        Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel
                        illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui
                        blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum
                        dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet
                        dolore magna aliquam erat volutpat.
                    </p>

                </div>
            </section>
            <section className='flex justify-between section'>
                <StaticImage src='../images/members.png' alt='' height={500} style={{height: '500px'}}/>
                <div className={'w-[600px] order-first'}>
                    <h1>Project Goals</h1>
                    {/* TODO: Members & Eughloh    */}
                    <ul className='list-disc'>
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
                <section className='flex section bg-base-200'>
                    <StaticImage src='../images/team.png' alt='' height={500} style={{height: '500px'}}/>
                    <div className={'w-[600px] ml-32'}>
                        <h1>Team</h1>
                        <Team/>
                    </div>
                </section>
            </div>
        </Layout>
    )
}

export default IndexPage

export {default as Head} from '../components/head';
