import * as React from "react";

const Hero = () => (
    <div className="hero py-24 text-white bg-primary">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-6xl font-bold">
                    <mark className='px-1 mr-1 rounded bg-white text-primary'>edu</mark>
                    <span className='text-accent'>TAP</span>
                </h1>
                {/* TODO: replace text */}
                <p className="text-xl mt-14 mb-10">
                    Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                    exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <div className='space-x-4'>
                    <button className='btn btn-lg btn-accent text-white'>Newsletter</button>
                    <a href="https://docs.edutap.eu/" className='btn btn-lg btn-accent text-white'>Docs</a>
                </div>
            </div>
        </div>
    </div>
)

export default Hero;