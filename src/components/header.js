import * as React from "react"
import NavLink from "./nav-link";
import {Link} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";

const links = [
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

// TODO: Make responsive, make sticky
const Header = () => (
    <header className='flex-none navbar justify-between my-2 px-24 bg-base-100'>
        <div className='w-36'>
            <Link to='/' className='text-4xl mr-40'>
                <mark className='px-1 mr-1 rounded bg-primary text-white'>edu</mark>
                <span className='text-accent'>TAP</span>
            </Link>
        </div>
        <nav className='mt-2'>
            <ul className='flex space-x-16'>
                {
                    links.map((link, index) => (
                        <li key={index}>
                            <NavLink to={link.to} text={link.text}/>
                        </li>
                    ))

                }
            </ul>
        </nav>
        <div className='w-36'>
            <Link to='https://github.com/edutap-eu'>
                <StaticImage src='../images/github-mark.png' alt='' height={40} style={{height: '40px'}}/>
            </Link>
        </div>
        {/* TODO: Github Image + Links to docs */}
    </header>
);

export default Header;