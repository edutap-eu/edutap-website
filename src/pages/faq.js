import * as React from "react";
import Layout from "../components/layout";

// TODO: replace with actual data
const faqs = [
    {
        "question": "Lorem ipsum",
        "answer": "Lorem ipsum"
    },
    {
        "question": "Lorem ipsum",
        "answer": "Lorem ipsum"
    },
    {
        "question": "Lorem ipsum",
        "answer": "Lorem ipsum"
    },
    {
        "question": "Lorem ipsum",
        "answer": "Lorem ipsum"
    }
]

const FaqPage = () => {
    return (
        <Layout>
            <section className={'section'}>
                <h1>F.A.Q.</h1>
                <div className={'space-y-2'}>
                    {
                        faqs.map((faq, index) => (
                            <div className="collapse collapse-arrow bg-base-200" key={index}>
                                <input type="radio" name="my-accordion" checked="checked"/>
                                <div className="collapse-title text-xl font-medium">
                                    {faq.question}
                                </div>
                                <div className="collapse-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </section>
        </Layout>
    )
}

export default FaqPage
export {default as Head} from '../components/head';
