import * as React from "react";
import {VerticalTimelineElement} from "react-vertical-timeline-component";

const Milestone = ({milestone}) => {
    const {title, description, date, status} = milestone;
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
        <VerticalTimelineElement iconStyle={{background: color}} date={date}
                                 contentStyle={{border: `2px solid ${color}`}}
                                 contentArrowStyle={{borderRight: `7px solid ${color}`}}>
            <h2>{title}</h2>
            <p>{description}</p>
        </VerticalTimelineElement>
    );
}

export default Milestone;