import {Container} from "@/components/container";
import {GithubMark} from "@/components/github-mark";
import * as React from "react";
import {useState} from "react";

export const CallToAction = () => {
    const [isHovering, setIsHovering] = useState(true);

    return (
        <div className="bg-black text-white">
            <Container size="sm" className="py-32 md:py-48 text-center">
                <h2 className="text-4xl font-bold tracking-tight mb-8">
                    Get Involved
                </h2>

                <p className="text-xl mb-12 max-w-xl mx-auto">
                    Join our open-source community and help shape the future of campus digital identity.
                </p>

                <a
                    href="https://github.com/edutap-eu"
                    className="inline-flex items-center px-8 py-4 rounded border-2 border-white hover:bg-white hover:text-black"
                    onMouseEnter={() => setIsHovering(false)}
                    onMouseLeave={() => setIsHovering(true)}
                >
                    <GithubMark className="mr-3 h-5 w-5" inverted={isHovering} />
                    <span className="font-bold">Contribute on GitHub</span>
                </a>
            </Container>
        </div>
    );
}
