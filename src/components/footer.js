import * as React from "react"
import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

const Footer = () => (
    <footer className="flex-none footer footer-center p-4 pt-8 bg-base-300 text-base-content text-white bg-primary">
        <div className={'flex space-x-4'}>
            <Link to={'/legal/privacy-policy'} className={'link link-hover'}>Privacy Policy</Link>
            <Link to={'/legal/imprint'} className={'link link-hover'}>Imprint</Link>
        </div>
        <div className={'flex space-x-4'}>
            <h2>A Project by</h2>
            <StaticImage src="../images/eugloh-white.webp" className={
                "w-[100px] h-[70px] md:hidden lg:block lg:w-[100px] lg:h-[70px] object-contain"
            } />
        </div>
        <aside className={'flex flex-col md:flex-row items-center md:space-x-12'}>
            <span className={'block md:inline'}>
                © {new Date().getFullYear()}, Built with <a className={'link'} href={'https://www.gatsbyjs.com'}>Gatsby</a>
            </span>
            <span className={'block md:inline'}>
                Illustration(s) from <a className={'link'} href={'https://absurd.design/'}>absurd.design</a>.
            </span>
        </aside>
    </footer>
);

export default Footer;