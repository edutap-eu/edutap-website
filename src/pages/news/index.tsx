import * as React from "react";
import {Layout} from "@/components/layout";
import {Container} from "@/components/container";
import {graphql, PageProps} from "gatsby";
import {NewsItem} from "@/components/news-item";

interface JsonNewsItem {
    date: string;
    title: string;
    description: string;
    url?: string;
}

interface MarkdownNewsItem {
    id: string;
    frontmatter: {
        date: string;
        title: string;
        slug: string;
        short: string;
    };
}

interface CombinedNewsItem {
    date: string;
    title: string;
    description: string;
    url?: string;
    isInternal?: boolean;
}

interface NewsPageData {
    allMicroNewsJson: {
        nodes: JsonNewsItem[];
    };
    allMarkdownRemark: {
        nodes: MarkdownNewsItem[];
    };
}

const NoNewsPlaceholder = () => (
    <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-500 mb-2">No news yet</h3>
        <p className="text-gray-400">Check back later for updates on the eduTAP project.</p>
    </div>
);

const NewsPage = ({ data }: PageProps<NewsPageData>) => {
    const jsonNewsItems: JsonNewsItem[] = data.allMicroNewsJson.nodes || [];
    const markdownNewsItems: MarkdownNewsItem[] = data.allMarkdownRemark.nodes || [];
    
    // Convert markdown posts to the same format
    const markdownFormattedItems: CombinedNewsItem[] = markdownNewsItems.map(post => ({
        date: post.frontmatter.date,
        title: post.frontmatter.title,
        description: post.frontmatter.short,
        url: "/news" + post.frontmatter.slug,
        isInternal: true
    }));
    
    // Convert JSON items to the same format
    const jsonFormattedItems: CombinedNewsItem[] = jsonNewsItems.map(item => ({
        ...item,
        isInternal: false
    }));
    
    // Combine both arrays and sort by date (newest first)
    const allNewsItems = [...jsonFormattedItems, ...markdownFormattedItems].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <Layout>
            <Container size="md" as="section" className="py-12 md:py-24">
                <h1 className="text-5xl font-bold tracking-tight mb-12">
                    News
                </h1>
                
                {allNewsItems.length > 0 ? (
                    allNewsItems.map((item, index) => (
                        <NewsItem
                            key={`${item.date}-${index}`}
                            date={item.date}
                            title={item.title}
                            description={item.description}
                            url={item.url}
                            isInternal={item.isInternal}
                        />
                    ))
                ) : (
                    <NoNewsPlaceholder />
                )}
            </Container>
        </Layout>
    );
};

export default NewsPage;
export {default as Head} from "@/components/head";

export const pageQuery = graphql`
  query {
    allMicroNewsJson {
      nodes {
        date
        title
        description
        url
      }
    }
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/news-posts/"}}
      sort: {frontmatter: {date: DESC}}
    ) {
      nodes {
        id
        frontmatter {
          date
          title
          slug
          short
        }
      }
    }
  }
`;