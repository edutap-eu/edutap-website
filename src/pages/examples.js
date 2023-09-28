import * as React from "react";

import Layout from "../components/layout";

// TODO: maybe rename to Showcases
const ExamplesPage = () => {
    return (
        <Layout>
            <section className={'section space-y-4 md:space-y-8 md:text-lg md:mt-12'}>
                <h1>Examples</h1>
                {/* TODO: add examples/stories/showcases   */}
            </section>
        </Layout>
    )
}

export default ExamplesPage;
export {default as Head} from '../components/head';
