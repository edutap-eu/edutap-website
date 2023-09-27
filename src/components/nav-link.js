import * as React from 'react';

import {Link} from "gatsby";

const NavLink = ({to, text}) => (
    // TODO: Rework styling (Checkout designs, improve animation)
    <Link to={to} className={'link link-hover text-lg decoration-4 decoration-primary underline-offset-4'}
          activeClassName={'text-primary'}
    >
        {text}
    </Link>
);

export default NavLink;