import * as React from "react"
import {graphql, Link} from "gatsby"
import {Layout} from "@/components/layout";
import {Container} from "@/components/container";
import {CalendarIcon, ArrowLeftIcon} from "lucide-react";
import {Button} from "@/components/ui/button";

type NewsPostTemplateProps = {
    data: {
        markdownRemark: {
            html: string
            frontmatter: {
                date: string
                slug: string
                title: string
            }
        }
    }
}

/**
 * News post template
 * @param data - post data, injected by GraphQL page query
 * @constructor
 */
function NewsPostTemplate({data}: NewsPostTemplateProps) {
    const {markdownRemark} = data // data.markdownRemark holds your post data
    const {frontmatter, html} = markdownRemark

    return (
        <Layout>
            <Container size="md" as="section" className="py-12 md:py-24">
                <div className="mb-8">
                    <Button variant="ghost" size="sm" className="group" asChild>
                        <Link to="/news">
                            <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                            <span className="-mb-px">Back to News</span>
                        </Link>
                    </Button>
                </div>
                
                <article>
                    <header className="mb-8">
                        <h1 className="text-5xl font-bold tracking-tight mb-6">
                            {frontmatter.title}
                        </h1>
                        
                        <div className="flex items-center">
                            <div className="flex items-center bg-secondary/20 text-secondary-foreground px-3 py-1 rounded-md">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span className="text-sm font-medium">{frontmatter.date}</span>
                            </div>
                        </div>
                    </header>
                    
                    <div 
                        className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-primary"
                        dangerouslySetInnerHTML={{__html: html}}
                    />
                </article>
            </Container>
        </Layout>
    )
}

export default NewsPostTemplate;
export {default as Head} from "@/components/head";

export const pageQuery = graphql`
  query($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`