import * as React from "react";
import {graphql, useStaticQuery} from "gatsby";
import {VerticalTimeline} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Layout from "../components/layout";
import Milestone from "../components/milestone";

const historyQuery = graphql`
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
    const data = useStaticQuery(historyQuery);

    return (
        <Layout>
            <section className={'section space-y-4 md:space-y-8 md:text-lg md:mt-12'}>
                <h1>History</h1>
                <VerticalTimeline lineColor={"#24343D"}>
                    {data.allHistoryJson.nodes.map((milestone, index) => <Milestone milestone={milestone}
                                                                                    key={index}/>)}
                </VerticalTimeline>
            </section>
        </Layout>
    )
}

export default HistoryPage;
export {default as Head} from '../components/head';
