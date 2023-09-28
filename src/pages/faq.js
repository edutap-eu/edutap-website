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
    const [active, setActive] = React.useState(null);
    const handler = (index) => () => {
        if(active === index) setActive(null)
        else setActive(index)
    }

    return (
        <Layout>
            <section className={'section space-y-6 md:space-y-8 md:mt-12'}>
                <h1>F.A.Q.</h1>
                <div className={'space-y-4'}>
                    {
                        faqs.map((faq, index) => (
                            <div className="collapse collapse-arrow bg-base-200" key={index}>
                                <input type="radio" name="faq" checked={active === index} onClick={handler(index)}/>
                                <div className="collapse-title text-lg md:text-xl font-bold">
                                    {faq.question}
                                </div>
                                <div className="collapse-content text-md md:text-lg">
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
