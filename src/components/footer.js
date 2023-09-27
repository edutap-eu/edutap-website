import * as React from "react"
import {Link} from "gatsby";

const Footer = () => (
    <footer className="flex-none footer footer-center p-4 bg-base-300 text-base-content">
        <div className={'flex space-x-12'}>
            <div className={'space-x-4'}>
                <Link to={'/legal/privacy-policy'} className={'link link-hover'}>Privacy Policy</Link>
                <Link to={'/legal/imprint'} className={'link link-hover'}>Imprint</Link>
            </div>
            <aside className={'space-x-12'}>
                <span>
                    © {new Date().getFullYear()}, Built with <a href={'https://www.gatsbyjs.com'}>Gatsby</a>
                </span>
                <span>
                    Illustration(s) from <a className={'link'} href={'https://absurd.design/'}>absurd.design</a>.
                </span>
            </aside>

        </div>
        {/* TODO: Imprint, privacy, contact */}
    </footer>
);

export default Footer;