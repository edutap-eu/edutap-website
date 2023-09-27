import * as React from "react";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import Layout from "../components/layout";
import {useEffect} from "react";

const milestones = [
    {
        title: 'First Involvement',
        description: 'to implement the European Student Card within the EUGLOH Alliance',
        date: '2020-07-01',
        status: 'done'
    },
    {
        title: 'Initial Idea eduTAP',
        description: 'Campus Life Meeting Online',
        date: '2020-11-10',
        status: 'done'
    },
    {
        title: 'Milestone 1: Kickoff Vision',
        description: 'EUGHLOH Annual Summit, Paris',
        date: '2022-06-10',
        status: 'done'
    },
    {
        title: 'Milestone 2: Presentation ECC Pilot',
        description: 'EUGLOH Annual Summit, Lund',
        date: '2023-06-29',
        status: 'done'
    },
    {
        title: 'Presentation',
        description: 'ECCA/DC4EU Workshop, Porto',
        date: '2023-09-21',
        status: 'done'
    },
    {
        title: 'Milestone 3: Presentation Prototype',
        description: 'EAIE Conference, Rotterdam',
        date: '2023-09-29',
        status: 'doing'
    },
    {
        title: 'Milestone 4: Implementation Library ID',
        description: 'at LMU Munich',
        date: '2023-12-10',
        status: 'todo'
    },
    {
        title: 'Milestone 5: Implementation Closed Loop Payment for Lunches',
        description: 'at LMU Munich',
        date: '2024-04-15',
        status: 'todo'
    },
    {
        title: 'Milestone 6: Presentation of eduTAP Core',
        description: 'ECCA Conference, Milan',
        date: '2024-04-15',
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
