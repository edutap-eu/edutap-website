import * as React from "react";
import {
  GatsbyImage,
  getImage,
  type IGatsbyImageData,
} from "gatsby-plugin-image";
import { graphql, useStaticQuery } from "gatsby";
import { Container } from "@/components/container";

const TEAM_QUERY = graphql`
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
              transformOptions: { fit: COVER, cropFocus: ATTENTION }
            )
          }
        }
      }
    }
  }
`;

type TeamMemberData = {
  name: string;
  org?: string;
  role?: string;
  image: any; // gatsby-image source
};

type TeamQueryResult = {
  allTeamJson: {
    nodes: TeamMemberData[];
  };
};

type TeamMemberCardProps = {
  name: string;
  info: string;
  imageData: IGatsbyImageData;
};

const TeamMember: React.FC<TeamMemberData> = ({ name, org, role, image }) => {
  const imageData = getImage(image);
  const info = [org, role].filter(Boolean).join(" • ");

  if (!imageData) {
    return null; // Handle missing image gracefully
  }

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 mb-4 overflow-hidden rounded-full">
        <GatsbyImage
          alt={name}
          image={imageData}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col items-center text-center max-w-xs">
        <span className="font-bold text-base sm:text-lg mb-1">{name}</span>
        <span className="text-gray-600 text-xs sm:text-sm">{info}</span>
      </div>
    </div>
  );
};

export const Team: React.FC = () => {
  const data = useStaticQuery<TeamQueryResult>(TEAM_QUERY);

  return (
    <Container size="sm" as="section" className="py-16 md:py-36">
      <h2 className="text-4xl font-bold tracking-tight text-center mb-16">
        Meet the Team
      </h2>

      <div className="grid gap-8 sm:gap-10 md:gap-12 px-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {data.allTeamJson.nodes.map((member, index) => (
          <TeamMember key={`team-member-${member.name}-${index}`} {...member} />
        ))}
      </div>
    </Container>
  );
};
