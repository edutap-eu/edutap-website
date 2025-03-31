import * as React from "react";
import {Layout} from "@/components/layout";
import {Container} from "@/components/container";
import {graphql, useStaticQuery} from "gatsby";
import {NewsItem} from "@/components/news-item";

const NEWS_QUERY = graphql`
  query NewsQuery {
    allNewsJson {
      nodes {
        date
        title
        description
        url
      }
    }
  }
`;

interface NewsItem {
    date: string;
    title: string;
    description: string;
    url?: string;
}

const NewsPage = () => {
    const data = useStaticQuery(NEWS_QUERY);
    const newsItems: NewsItem[] = data.allNewsJson.nodes || [];

    return (
        <Layout>
            <Container size="md" as="section" className="py-12 md:py-24">
                <h1 className="text-5xl font-bold tracking-tight mb-12">
                    News
                </h1>
                {newsItems.map((item, index) => (
                    <NewsItem
                        key={`${item.date}-${index}`}
                        date={item.date}
                        title={item.title}
                        description={item.description}
                        url={item.url}
                    />
                ))}
            </Container>
        </Layout>
    );
};

export default NewsPage;
export {default as Head} from "@/components/head";