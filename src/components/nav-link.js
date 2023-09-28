import * as React from "react";
import {Link} from "gatsby";

const NavLink = ({to, text, index}) => (
    <li key={index} className={'flex items-center'}>
        <Link to={to} className={'nav-link'} activeClassName={'text-primary'}>
            {text}
        </Link>
    </li>
);

export default NavLink;