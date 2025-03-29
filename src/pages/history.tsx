import * as React from "react";
import {graphql, useStaticQuery} from "gatsby";
import {VerticalTimeline} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import {Layout} from "@/components/layout";
import {Milestone, type MilestoneType} from "@/components/milestone";
import {Container} from "@/components/container";

const HISTORY_QUERY = graphql`
query HistoryQuery {
  allHistoryJson {
    nodes {
      milestone_type
      date
      location
      title
      description
      status
      event_name
      event_link
      video_link
      presentation_file
    }
  }
}`;


const HistoryPage = () => {
    const data = useStaticQuery(HISTORY_QUERY);

    return (
        <Layout>
            <Container size="md" as="section" className='py-12 md:py-36'>
                <h1 className="bg-white text-5xl font-bold tracking-tight mb-12">History</h1>
                <VerticalTimeline lineColor={"#24343D"}>
                    {data.allHistoryJson.nodes.map((milestone: MilestoneType, index: number) => <Milestone milestone={milestone}
                                                                                    key={index}/>)}
                </VerticalTimeline>
            </Container>
        </Layout>
    )
}

export default HistoryPage;
export {default as Head} from '@/components/head';
