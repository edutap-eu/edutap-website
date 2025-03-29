import * as React from "react";
import { Layout } from "@/components/layout";
import {
  CallToAction,
  ConceptAndSoftware,
  FeatureGrid,
  Hero,
  MissionStatement,
  Team,
} from "@/components/landing";

const IndexPage = () => (
  <Layout>
    <Hero />
    <MissionStatement />
    <FeatureGrid />
    <ConceptAndSoftware />
    <Team />
    <CallToAction />
  </Layout>
);

export default IndexPage;
export { default as Head } from "@/components/head";
