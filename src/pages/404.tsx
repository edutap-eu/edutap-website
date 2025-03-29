import * as React from "react"
import {Link} from "gatsby"
import {Layout} from "@/components/layout";
import {Button} from "@/components/ui/button";

const NotFoundPage = () => {
    return (
        <Layout>
            <div className='bg-base-200 py-20'>
                <div className='space-y-8 w-2/5 mx-auto'>
                    <h1 className='text-4xl font-bold'>404: Page not found</h1>
                    <p className={'text-xl'}>
                        Sorry 😔 we could not find what you were looking for.
                    </p>
                    <Button asChild size="lg">
                        <Link to="/">Back to Overview</Link>
                    </Button>
                </div>
            </div>
        </Layout>
    )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
