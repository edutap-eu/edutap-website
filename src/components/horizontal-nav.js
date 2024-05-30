import {Link} from "gatsby";
import * as React from "react";

const HorizontalNav = ({nav}) => (
    <nav className={'flex justify-end'}>
        <ul className={'hidden lg:flex space-x-8 xl:space-x-12'}>
            {nav.map((link, index) => (
                <li key={index} className={'flex items-center'}>
                    <Link to={link.to} className={'nav-link'} activeClassName={'text-primary'}>
                        {link.text}
                    </Link>
                </li>
            ))}
        </ul>
    </nav>
);

export default HorizontalNav;