import * as React from "react";
import {Link} from "gatsby";

type Link = {
    href: string;
    label: string;
}

const NavLink = ({href, label}: { href: string, label: string }) => (
    <Link to={href} className="text-sm text-gray-300 hover:underline hover:text-white transition-colors">
        {label}
    </Link>
);

export const NavColumn = ({title, links}: { title: string, links: Link[] }) => (
    <div>
        <h4 className="font-semibold mb-4">
            {title}
        </h4>
        <ul className="space-y-2">
            {links.map(({href, label}, index) => (
                <li key={index}>
                    <NavLink href={href} label={label} />
                </li>
            ))}
        </ul>
    </div>
);