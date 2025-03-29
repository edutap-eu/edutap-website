import * as React from "react";
import { Layout } from "@/components/layout";
import { Container } from "@/components/container";
import { UnderConstruction } from "@/components/under-construction";

const NewsPage = () => {
  return (
    <Layout>
      <Container size="md" as="section" className="py-12 md:py-36">
        <h1 className="bg-white text-5xl font-bold tracking-tight mb-12">
          News
        </h1>
        <UnderConstruction />
      </Container>
    </Layout>
  );
};

export default NewsPage;
export { default as Head } from "@/components/head";
