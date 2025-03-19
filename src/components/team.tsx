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
            formats: [AUTO]
            layout: FULL_WIDTH
            aspectRatio: 1
            transformOptions: {fit: COVER, cropFocus: ATTENTION}
          )
        }
      }
    }
  }
}`;

const TeamMember = ({name, org, role, image}) => {
    const info = [org, role].filter(Boolean).join(' • ')
    const img = getImage(image);

    return (
        <div className={'flex flex-col space-y-2 items-center'}>
            <div className="avatar">
                <div className="w-28 mask mask-squircle">
                    <GatsbyImage alt={''} image={img} className={'w-[120px] h-[120px] object-scale-down'}/>
                </div>
            </div>
            <div className={'flex flex-col items-center text-center'}>
                <span className={'w-40 md:w-48 whitespace-normal text-center block font-bold'}>{name}</span>
                <span>({info})</span>
            </div>
        </div>
    )
}

const Team = () => {
    const data = useStaticQuery(teamQuery);

    return (
        <div className={'grid grid-cols-2 gap-y-8 md:grid-cols-3 gap-x-4 lg:gap-x-8 lg:gap-y-4 md:gap-y-8'}>
            {data.allTeamJson.nodes.map((member, index) => <TeamMember key={index} {...member}/>)}
        </div>
    );
}

export default Team;
