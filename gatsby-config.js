/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  // Note: Must be updated/removed when site is deployed on different path
  pathPrefix: "/",
  siteMetadata: {
    title: "eduTAP",
    // TODO: Update siteUrl to production URL
    siteUrl: "https://edutap.eu"
  },
  plugins: ["gatsby-plugin-postcss", "gatsby-plugin-image", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};
