import * as React from "react";
import { VerticalTimelineElement } from "react-vertical-timeline-component";
import clsx from "clsx";

export type MilestoneType = {
  milestone_type?: string;
  date: string;
  location?: string;
  event_name?: string;
  title: string;
  description: string;
  status: string;
  event_link?: string;
  presentation_file?: string;
  video_link?: string;
};

export const Milestone = ({ milestone }: { milestone: MilestoneType }) => {
  const {
    milestone_type = null,
    date,
    location = null,
    event_name = null,
    title,
    description,
    status,
    event_link = null,
    presentation_file = null,
    video_link = null,
  } = milestone;
  console.log(milestone);
  const [color, setColor] = React.useState(status);

  // TODO: make colors depend on ui theme
  React.useEffect(() => {
    switch (status) {
      case "reached":
        setColor("#12684A");
        break;
      case "next":
        setColor("#3E99C0");
        break;
      case "future":
        setColor("#24343D");
        break;
      default:
        throw new Error(`Invalid status: ${status} for milestone "${title}"`);
    }
  }, [status, title]);

  return (
    <VerticalTimelineElement
      iconStyle={{
        background: color,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      icon={
        status === "reached" && <span className={"text-4xl text-white"}>✓</span>
      }
      date={date}
      contentStyle={{ border: `2px solid ${color}` }}
      contentArrowStyle={{ borderRight: `7px solid ${color}` }}
    >
      <div>
        {milestone_type !== null && (
          <span className={"text-base-content/70"}>{milestone_type}</span>
        )}
        <h2 className={"mb-4! md:text-3xl!"}>{title}</h2>
        {description && <p className={"text-xl! font-light!"}>{description}</p>}

        {/*Show if "description is set" AND ("at least one of the links is set" OR "location is set")*/}
        {([event_link, presentation_file, video_link].some(Boolean) ||
          location ||
          event_name) && <div className={"border-t mt-4 mb-3"} />}
        {/*Show if at least one of the links is set*/}
        {[event_link, presentation_file, video_link].some(Boolean) && (
          <div className={"py-3 *:mb-2 [&>*]:btn [&>*]:btn-sm *:mr-2"}>
            {event_link && (
              <a
                role="button"
                target="_blank"
                rel="noreferrer"
                href={event_link}
              >
                Event-Website
              </a>
            )}
            {presentation_file && (
              <a
                role="button"
                target="_blank"
                rel="noreferrer"
                href={`/presentations/${presentation_file}`}
              >
                Slides
              </a>
            )}
            {video_link && (
              <a
                role="button"
                target="_blank"
                rel="noreferrer"
                href={video_link}
              >
                YouTube-Video
              </a>
            )}
          </div>
        )}
        {(event_name || location) && (
          <div className={"flex"}>
            <div className={"mr-2"}>📍</div>
            <div>
              {event_name && <span className={"block"}>{event_name}</span>}
              {location && <span className={"block"}>{location}</span>}
            </div>
          </div>
        )}
      </div>
    </VerticalTimelineElement>
  );
};
