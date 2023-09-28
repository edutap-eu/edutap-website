import * as React from "react";

import Layout from "../components/layout";
import UnderConstruction from "../components/under-construction";

const ShowcasesPage = () => {
    return (
        <Layout>
            <section className={'section space-y-4 md:space-y-8 md:text-lg md:mt-12'}>
                <h1>Showcases</h1>
                <UnderConstruction />
                {/* TODO: add showcases   */}
            </section>
        </Layout>
    )
}

export default ShowcasesPage;
export {default as Head} from '../components/head';
