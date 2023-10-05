import * as React from "react";
import clsx from "clsx";
import {Link} from "gatsby";

const FullScreenNav = ({nav}) => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggle = () => setIsOpen(prev => !prev);
    const close = () => setIsOpen(false);

    return (
        <div className={'lg:hidden'}>
            <button className={'btn btn-ghost'} onClick={toggle}>
                {/*TODO: add x icon, make sure it does not shift in sight*/}
                {
                    isOpen
                        ? <span>X</span>
                        : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                               className="inline-block w-7 h-7 stroke-current">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                }
            < /button>
            <div
                className={clsx('absolute left-0 top-18 overscroll-none w-screen h-screen bg-base-100 transition ease-in-out delay-150', !isOpen && 'hidden')}>
                <div className={'flex h-full justify-center items-center'}>
                    <nav className={'inline-block'}>
                        <ul tabIndex={0} className={'space-y-6 mb-20'}>
                            {nav.map((link, index) => (
                                <li key={index} className={'flex items-center justify-center'}>
                                    <Link to={link.to} className={'nav-link !text-4xl font-bold'}
                                          activeClassName={'text-primary'}
                                          onClick={close}>
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    );
}

export default FullScreenNav;