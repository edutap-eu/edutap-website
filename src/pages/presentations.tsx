import * as React from "react";
import {graphql, useStaticQuery} from "gatsby";
import {Layout} from "@/components/layout";
import  {Presentation, type PresentationType} from "@/components/presentation";
import { Container } from "@/components/container";

const PRESENTATIONS_QUERY = graphql`
query PresentationsQuery {
    allPresentationsJson {
        nodes {
            title
            file 
            description
            type
       }
    }
}`;


const PresentationsPage = () => {
    const data = useStaticQuery(PRESENTATIONS_QUERY);

    return (
        <Layout>
            <Container size="md" as="section" className='py-12 md:py-24'>
                <h1 className="text-5xl font-bold tracking-tight mb-12 text-center md:text-left">Presentations</h1>

                <div className="mb-16">
                    <h2 className="text-3xl font-semibold pb-3 mb-8 border-b-4 border-primary inline-block">
                        Lightning Talks
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {data.allPresentationsJson.nodes
                            .filter((presentation: PresentationType) => presentation.type === 'lightning')
                            .map((presentation: PresentationType, index: number) => (
                                <Presentation presentation={presentation} key={index}/>
                            ))}
                    </div>
                </div>

                <div className="mb-8">
                    <h2 className="text-3xl font-semibold pb-3 mb-8 border-b-4 border-primary inline-block">
                        Conference Talks
                    </h2>
                    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {data.allPresentationsJson.nodes
                            .filter((presentation: PresentationType) => presentation.type === 'conference')
                            .map((presentation: PresentationType, index: number) => (
                                <Presentation presentation={presentation} key={index}/>
                            ))}
                    </div>
                </div>
            </Container>
        </Layout>
    )
}


export default PresentationsPage;
export {default as Head} from '@/components/head';