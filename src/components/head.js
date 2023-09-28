import * as React from "react";
import {useStaticQuery, graphql} from "gatsby";

const metadataQuery = graphql`
query MetadataQuery {
  site {
    siteMetadata {
      title
    }
  }
}`;

const Head = () => {
    const data = useStaticQuery(metadataQuery);
    return (
        <>
            <title>{data.site.siteMetadata.title}</title>
        </>
    );
}

export default Head