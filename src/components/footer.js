import * as React from "react"
import {Link} from "gatsby";

const Footer = () => (
    <footer className="flex-none footer footer-center p-4 bg-base-300 text-base-content">
        <div className={'inline-block space-x-4'}>
            <Link to={'/legal/privacy-policy'} className={'link link-hover'}>Privacy Policy</Link>
            <Link to={'/legal/imprint'} className={'link link-hover'}>Imprint</Link>
        </div>
        <aside className={'inline-block md:space-x-12'}>
                <span className={'block md:inline'}>
                    © {new Date().getFullYear()}, Built with <a href={'https://www.gatsbyjs.com'}>Gatsby</a>
                </span>
            <span className={'block md:inline'}>
                    Illustration(s) from <a className={'link'} href={'https://absurd.design/'}>absurd.design</a>.
                </span>
        </aside>
    </footer>
);

export default Footer;