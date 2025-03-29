import { graphql, Link, useStaticQuery } from "gatsby";
import * as React from "react";

export const NAV_LINKS_QUERY = graphql`
  query navLinksQuery {
    allNavJson {
      nodes {
        text
        to
      }
    }
  }
`;

export const NavLinks = () => {
  const data = useStaticQuery(NAV_LINKS_QUERY);

  return (
    <nav className="items-center space-x-6">
      {data.allNavJson.nodes.map((nav: any) => (
        <Link
          key={nav.to}
          to={nav.to}
          className="font-medium hover:text-primary transition-colors text-black/70"
          activeClassName="text-primary font-bold underline decoration-2 underline-offset-6"
        >
          {nav.text}
        </Link>
      ))}
    </nav>
  );
};
