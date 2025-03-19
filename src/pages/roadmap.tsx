import * as React from "react";
import {graphql, useStaticQuery} from "gatsby";
import {VerticalTimeline} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Layout} from "@/components/layout";
import {Milestone, type MilestoneType} from "@/components/milestone";
import {Container} from "@/components/container";

const ROADMAP_QUERY = graphql`
query RoadmapQuery {
  allRoadmapJson {
    nodes {
      milestone_type
      date
      location
      title
      description
      status
    }
  }
}`;


const RoadmapPage = () => {
    const data = useStaticQuery(ROADMAP_QUERY);

    return (
        <Layout>
            <Container size="md" as="section" className='py-12 md:py-36'>
                <h1 className="bg-white text-5xl font-bold tracking-tight mb-12">Roadmap</h1>
                <VerticalTimeline lineColor={"#24343D"}>
                    {data.allRoadmapJson.nodes.map((milestone: MilestoneType, index: number) => <Milestone milestone={milestone}
                                                                                    key={index}/>)}
                </VerticalTimeline>
            </Container>
        </Layout>
    )
}

export default RoadmapPage;
export {default as Head} from '@/components/head';
