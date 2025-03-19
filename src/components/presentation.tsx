import * as React from "react";

const Presentation = ({presentation}) => {
    const {
        title,
        file,
        description
    } = presentation;

    return (
        <div className={'card border-2 border-primary shadow-xl'}>
            <div className={'card-body'}>
                <h2 className={'card-title !mb-4'}>{title}</h2>
                {description && <p className={'text-2xl font-light'}>{description}</p>}
                <div className={'card-actions justify-end'}>
                    <a href={`/presentations/${file}`} className={'btn'} role="button" target="_blank"
                       rel="noreferrer">Open</a>
                </div>
            </div>

        </div>
    )
}


export default Presentation;