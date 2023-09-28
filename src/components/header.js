import * as React from "react"
import NavBar from "./nav-bar";
import {Link} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";

// TODO: Make sticky
const Header = () => (
    <>
        <header className={'flex-none navbar md:px-6 lg:px-12 xl:max-w-screen-2xl mx-auto bg-base-100'}>
            <div className={'navbar-start'}>
                <Link to='/' className='text-4xl mr-40'>
                    <mark className='px-1 mr-1 rounded bg-primary text-white'>edu</mark>
                    <span className='text-accent'>TAP</span>
                </Link>
            </div>
            <div className={'navbar-center'}>
                <NavBar/>
            </div>
            <div className={'navbar-end'}>
                <a href='https://github.com/edutap-eu'>
                    <StaticImage src='../images/github-mark.png' alt='' height={36} style={{height: '36px'}}/>
                </a>
            </div>
        </header>
    </>
);

export default Header;