import * as React from "react";
import {Link} from "gatsby";

const LINKS = [
    {
        to: '/',
        text: 'Start'
    },
    {
        to: '/roadmap',
        text: 'Roadmap'
    },
    {
        to: '/examples',
        text: 'Examples'
    },
    {
        to: '/about',
        text: 'About'
    },
    {
        to: '/faq',
        text: 'FAQ'
    }
];

const NavLink = ({to, text}) => (
    <Link to={to} className={'link link-hover text-lg decoration-4 decoration-primary underline-offset-4'}
          activeClassName={'text-primary'}
    >
        {text}
    </Link>
);

// Not my best work ^^ but hey it works
const NavBar = () => {
    const navLinks =LINKS.map((link, index) => (
        <li key={index} className={'flex items-center'}>
            <NavLink to={link.to} text={link.text}/>
        </li>
    ));

    return (
        <nav className={'flex justify-end'}>
            <ul className={'hidden lg:flex space-x-12 xl:space-x-20'}>
                {navLinks}
            </ul>
            <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                         className="inline-block w-7 h-7 stroke-current">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M4 6h16M4 12h16M4 18h16"></path>
                    </svg>
                </label>
                {/* TODO: make full screen*/}
                <ul tabIndex="0" className="dropdown-content translate-x-[-50%] left-[50%] menu p-2 border bg-base-100 w-52">
                    {navLinks}
                </ul>
            </div>
        </nav>
    );
}

export default NavBar;