import * as React from "react"
import {graphql, Link, useStaticQuery} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";
import NavLink from "./nav-link";


const navLinksQuery = graphql`
query navLinksQuery {
  allNavJson {
    nodes {
      text
      to
    }
  }
}`;
// TODO: Make sticky
const Header = () => {
    const data = useStaticQuery(navLinksQuery);
    const navLinks = data.allNavJson.nodes.map((navLink, index) => <NavLink key={index} {...navLink} index={index}/>);

    return (
        <>
            <header className={'flex-none navbar px-4 md:px-6 lg:px-12 xl:max-w-screen-xl mx-auto bg-base-100'}>
                <div className={'navbar-start'}>
                    <Link to='/' className='text-4xl mr-40'>
                        <mark className='px-1 mr-1 rounded bg-primary text-white'>edu</mark>
                        <span className='text-accent'>TAP</span>
                    </Link>
                </div>
                <div className={'navbar-center'}>
                    <nav className={'flex justify-end'}>
                        <ul className={'hidden lg:flex space-x-12 xl:space-x-20'}>
                            {navLinks}
                        </ul>
                    </nav>
                </div>
                <div className={'navbar-end space-x-4'}>
                    <a href='https://github.com/edutap-eu'>
                        <StaticImage src='../images/github-mark.png' alt='' height={36} style={{height: '36px'}}/>
                    </a>
                    <nav className="dropdown dropdown-bottom dropdown-end">
                        <label tabIndex="0" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 className="inline-block w-7 h-7 stroke-current">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"></path>
                            </svg>
                        </label>
                        {/* TODO: make full screen*/}
                        <ul tabIndex="0"
                            className="dropdown-content z-[1] menu p-2 bg-base-100 w-52">
                            {navLinks}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
};

export default Header;