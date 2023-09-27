import * as React from "react";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Layout from "../components/layout";
import {useEffect} from "react";

const milestones = [
    {
        title: 'Milestone 2',
        description: 'Presentation ECCA/DC4EU Workshop',
        date: '2023-09-21',
        status: 'done'
    },
    {
        title: 'Milestone 1',
        description: 'Description',
        date: '2023-09-10',
        status: 'done'
    },
    {
        title: 'Milestone 2',
        description: 'Description',
        date: '2023-10-10',
        status: 'doing'
    },
    {
        title: 'Milestone 3',
        description: 'Description',
        date: '2023-12-10',
        status: 'todo'
    },
    {
        title: 'Milestone 4',
        description: 'Description',
        date: '2024-01-10',
        status: 'todo'
    }
];

const Milestone = ({milestone}) => {
    const {title, description, date, status} = milestone;
    const [color, setColor] = React.useState(status);

    // TODO: make colors depend on ui theme
    useEffect(() => {
        switch (status) {
            case 'done':
                setColor('#12684A');
                break;
            case 'doing':
                setColor('#3E99C0');
                break;
            case 'todo':
                setColor('#24343D');
                break;
            default:
                throw new Error(`Invalid status: ${status} for milestone "${title}"`);
        }
    }, []);

    return (
        <VerticalTimelineElement iconStyle={{background: color}} date={milestone.date}
                                 contentStyle={{border: `2px solid ${color}`}}
                                 contentArrowStyle={{borderRight: `7px solid ${color}`}}>
            <h2>{milestone.title}</h2>
            <p>{milestone.description}</p>
        </VerticalTimelineElement>
    );
}

const RoadmapPage = () => {
    return (
        <Layout>
            {/*TODO: add image here */}
            <section className={'section'}>
                <h1>Roadmap</h1>
                <VerticalTimeline lineColor={"#24343D"}>
                    {
                        milestones.map((milestone, index) => (
                            <Milestone milestone={milestone} key={index}/>
                        ))
                    }
                </VerticalTimeline>
            </section>
        </Layout>
    )
}

export default RoadmapPage;
export {default as Head} from '../components/head';
