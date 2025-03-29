import * as React from "react";
import { Layout } from "@/components/layout";
import { UnderConstruction } from "@/components/under-construction";
import { Container } from "@/components/container";

const ImprintPage = () => (
  <Layout>
    <Container size="md" as="section" className="prose py-12 md:py-36">
      <h1 className="bg-white text-5xl font-bold tracking-tight mb-12">
        Imprint
      </h1>
      <UnderConstruction />
      {/* TODO */}
    </Container>
  </Layout>
);

export default ImprintPage;
export { default as Head } from "@/components/head";
