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
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
                        ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo
                        dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor
                        sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
                        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
                        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem
                        ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
                        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
                        et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
                        est Lorem ipsum dolor sit amet.
                    </p>
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
                    <h1>Members</h1>
                    {/* TODO: Members & Eughloh    */}
                    <p>
                        Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                        aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit
                        esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et
                        iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait
                        nulla facilisi.
                    </p>
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
