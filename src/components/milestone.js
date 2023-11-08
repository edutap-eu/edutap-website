import * as React from "react";
import {VerticalTimelineElement} from "react-vertical-timeline-component";

const Milestone = ({milestone}) => {
    const {milestone_type=null, date, location= null, title, description, status, event_link=null, presentation_link=null, video_link=null } = milestone;
    const [color, setColor] = React.useState(status);

    // TODO: make colors depend on ui theme
    React.useEffect(() => {
        switch (status) {
            case 'reached':
                setColor('#12684A');
                break;
            case 'next':
                setColor('#3E99C0');
                break;
            case 'future':
                setColor('#24343D');
                break;
            default:
                throw new Error(`Invalid status: ${status} for milestone "${title}"`);
        }
    }, [status, title]);

    return (
        <VerticalTimelineElement iconStyle={{background: color}} 
                                 date={date}
                                 contentStyle={{border: `2px solid ${color}`}}
                                 contentArrowStyle={{borderRight: `7px solid ${color}`}}
                                 >
            {milestone_type !== null && <span>{milestone_type}</span>}
            <h2>{title}</h2>
            <p>{description}</p>
            {event_link !== null && event_link !== ""  && presentation_link !== null && event_link !== "" && video_link !== null && event_link !== "" && <ul class="vertical-list">
                {event_link !== null && event_link !== ""  && <li><a role="button" class="button" target="_blank" href={event_link} >Event-Website</a></li>}
                {presentation_link !== null && event_link !== "" && <li><a role="button" class="button" target="_blank" href={presentation_link} >Slides</a></li>}
                {video_link !== null && event_link !== "" && <li><a role="button" class="button" target="_blank" href={video_link} >YouTube-Video</a></li>}
            </ul>}
            <p>{location}</p>
        </VerticalTimelineElement>
    );
}

export default Milestone;