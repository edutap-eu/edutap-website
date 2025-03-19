import * as React from "react";
import {graphql, useStaticQuery} from "gatsby";
import Layout from "../components/layout";
import Presentation from "../components/presentation";

const presentationsQuery = graphql`
query PresentationsQuery {
    allPresentationsJson {
        nodes {
            title
            file 
            description
       }
    }
}`;


const PresentationsPage = () => {
    const data = useStaticQuery(presentationsQuery);

    return (
        <Layout>
            <section className={'section space-y-4 md:space-y-8 md:text-lg md:mt-12'}>
                <h1>Presentations</h1>
                <div className={'space-y-2'}>
                    {data.allPresentationsJson.nodes.map((presentation, index) => <Presentation
                        presentation={presentation}
                        key={index}/>)}
                </div>
            </section>
        </Layout>
    )
}


export default PresentationsPage;
export {default as Head} from '../components/head';