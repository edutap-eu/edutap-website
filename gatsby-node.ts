import * as path from "path";
import type { GatsbyNode } from "gatsby";

export const onCreateWebpackConfig: GatsbyNode["createPages"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/lib/utils"),
      },
    },
  });
};

/**
 * Customize the GraphQL schema to ensure consistent return types
 * even when data sources are empty
 */
export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  const { createTypes } = actions;
  
  // Define the schema for our news items to ensure nodes is always an array
  const typeDefs = `
    type MicroNewsJson implements Node {
      date: String!
      title: String!
      description: String!
      url: String
    }
    
    type AllMicroNewsJson {
      nodes: [MicroNewsJson!]!
    }
    
    type Query {
      allMicroNewsJson: AllMicroNewsJson!
    }
  `;
  
  createTypes(typeDefs);
};