import * as React from "react";

const HamburgerButton = ({isOpen, onClick}) => (
    <label className="btn btn-circle btn-ghost swap swap-rotate" onClick={onClick}>

        {/* this hidden checkbox controls the state */}
        <input type="checkbox" value={isOpen}/>

        {/* hamburger icon */}
        <svg className="swap-off inline-block w-7 h-7 stroke-current" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>

        {/* close icon */}
        <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg"
             viewBox="0 0 24 24"
             stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>

    </label>
);

export default HamburgerButton;
