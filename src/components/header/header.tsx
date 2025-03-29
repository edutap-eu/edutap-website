import * as React from "react"
import {Link} from "gatsby";
import {GithubMark} from "@/components/github-mark";
import {Button} from "@/components/ui/button";
import {NavLinks} from "@/components/header/nav";
import {Container} from "@/components/container";

export const Header: React.FC = () => (
    <>
        <Container as="header" className="py-4 transition-all duration-300 backdrop-blur-md z-50 sticky top-0 bg-white/80 border-b border-gray-100">
                <div className="flex items-center justify-between">
                    <Link to="/" className="font-bold text-2xl transition-all duration-300 text-black">
                        <span className="px-2 mr-1 rounded-sm bg-primary text-white">edu</span>
                        <span className="text-accent">TAP</span>
                    </Link>

                    {/* On >= md screens, show inline nav links */}
                    <div className="hidden md:flex">
                        <NavLinks/>
                    </div>

                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild className='hidden md:flex'>
                            <a href="https://docs.edutap.eu/" className="flex items-center"
                               target="_blank"
                               rel="noreferrer">
                                Documentation
                            </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <a href="https://demo.edutap.eu/" className="flex items-center"
                               target="_blank"
                               rel="noreferrer">
                                Demo
                            </a>
                        </Button>
                        <Button
                            variant="default"
                            size="sm"
                            className="bg-black text-white hover:bg-black/90 hidden md:flex"
                            asChild
                        >
                            <a href="https://github.com/edutap-eu" className="flex items-center"
                               target="_blank"
                               rel="noreferrer">
                                <GithubMark className="mr-2 h-4 w-4" inverted/> GitHub
                            </a>
                        </Button>
                    </div>
                </div>
        </Container>

        {/* On < md screens, show mobile nav */}
        <div className="flex md:hidden overflow-auto no-scrollbar py-4 px-4">
            <NavLinks/>
        </div>
    </>
);


