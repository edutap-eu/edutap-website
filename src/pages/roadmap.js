import * as React from "react";
import {graphql, useStaticQuery} from "gatsby";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Layout from "../components/layout";
import Milestone from "../components/milestone";

const roadmapQuery = graphql`
query RoadmapQuery {
  allRoadmapJson {
    nodes {
      date
      description
      status
      title
    }
  }
}`;


const RoadmapPage = () => {
    const data = useStaticQuery(roadmapQuery);

    return (
        <Layout>
            <section className={'section space-y-4 md:space-y-8 md:text-lg md:mt-12'}>
                <h1>Roadmap</h1>
                <VerticalTimeline lineColor={"#24343D"}>
                    {data.allRoadmapJson.nodes.map((milestone, index) => <Milestone milestone={milestone} key={index}/>)}
                </VerticalTimeline>
            </section>
        </Layout>
    )
}

export default RoadmapPage;
export {default as Head} from '../components/head';
