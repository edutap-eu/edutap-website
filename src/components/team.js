import * as React from "react";
import {GatsbyImage, getImage} from "gatsby-plugin-image";
import {graphql, useStaticQuery} from "gatsby";

const teamQuery = graphql`
query TeamQuery {
  allTeamJson {
    nodes {
      name
      org
      role
      image {
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            formats: [PNG, JPG]
            layout: FULL_WIDTH
            aspectRatio: 2
            transformOptions: {cropFocus: ATTENTION}
          )
        }
      }
    }
  }
}`;

const TeamMember = ({name, org, role, image}) => {
    const caption = [name, org, role].filter(Boolean).join(' • ')
    const img = getImage(image);

    return (
        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <GatsbyImage alt={''} image={img} height={120} style={{height: '120px'}}/>
                </div>
            </div>
            <span className={'font-bold'}>{caption}</span>
        </div>
    )
}

const Team = () => {
    const data = useStaticQuery(teamQuery);

    return (
        <div className={'grid grid-cols-3 gap-16'}>
            {data.allTeamJson.nodes.map((member, index) => <TeamMember key={index} {...member}/>)}
        </div>
    );
}

export default Team;
