import * as React from "react";
import {StaticImage} from "gatsby-plugin-image";

const UnderConstruction = () => (
    <div className={'flex flex-col md:flex-row items-center md:items-start space-y-12 space-x-12 px-24 py-16 border-2 border-neutral'}>
        <StaticImage src={'../images/under-construction.png'} alt={''} class={'max-w-[200px]'}/>
        <div>
            <span className={'text-2xl font-bold'}>Under Construction</span>
            <p>
                This page is under construction. Please check back later.
            </p>
        </div>
    </div>
);

export default UnderConstruction;