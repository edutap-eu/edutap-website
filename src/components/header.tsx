import * as React from "react"
import {graphql, Link, useStaticQuery} from "gatsby";
import {StaticImage} from "gatsby-plugin-image";
import FullScreenNav from "./full-screen-nav";
import HorizontalNav from "./horizontal-nav";


const navLinksQuery = graphql`
query navLinksQuery {
  allNavJson {
    nodes {
      text
      to
    }
  }
}`;

const Header = () => {
    const data = useStaticQuery(navLinksQuery);

    return (
        <div className={'sticky top-0 z-10 h-18 bg-base-100'}>
            <header className={'flex-none navbar px-4 md:px-6 lg:px-12 xl:max-w-screen-xl mx-auto bg-base-100'}>
                <div className={'navbar-start'}>
                    <Link to='/' className='text-4xl mr-40'>
                        <mark className='px-1 mr-1 rounded bg-primary text-white'>edu</mark>
                        <span className='text-accent'>TAP</span>
                    </Link>
                </div>
                <div className={'navbar-center'}>
                    <HorizontalNav nav={data.allNavJson.nodes}/>
                </div>
                <div className={'navbar-end space-x-4'}>
                    <a href='https://github.com/edutap-eu'>
                        <StaticImage src='../images/github-mark.png' alt='' height={36} style={{height: '36px'}}/>
                    </a>
                    <FullScreenNav nav={data.allNavJson.nodes}/>
                </div>
            </header>
        </div>
    )
};

export default Header;