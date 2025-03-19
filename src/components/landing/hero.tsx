import {Container} from "@/components/container";
import {Badge} from "@/components/ui/badge";
import {GithubMark} from "@/components/github-mark";
import * as React from "react";

export const Hero = () => (
    <div className="bg-gradient-to-b from bg-white to-secondary/50">
        <Container size="sm" as='section' className="pt-48 py-36">
            <div className="flex flex-col items-center text-center">
                <Badge className="text-sm mb-6">
                    No app, just tap it.
                </Badge>

                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-8">
                    <span className="text-primary">edu</span>
                    <span className="text-accent">TAP</span>
                </h1>

                <div className="w-20 h-1 bg-black mb-10"></div>

                <p className="text-xl sm:text-2xl text-secondary-foreground leading-relaxed mb-12">
                    Educational Tapping enables using smart devices to perform transactions with a simple
                    tap — making everyday interactions easier and more secure both on campus and beyond.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                    <a
                        href="https://docs.edutap.eu/"
                        target="_blank"
                        rel="noreferrer"
                        className="rounded px-8 py-4 bg-primary text-primary-foreground font-medium transition-colors hover:bg-gray-800"
                    >
                        Documentation
                    </a>
                    <a
                        href="https://github.com/edutap-eu"
                        className="rounded px-8 py-4 bg-white font-medium text-black flex items-center justify-center transition-colors hover:bg-gray-100"
                    >
                        <GithubMark className="mr-2 h-5 w-5"/>
                        Github
                    </a>
                </div>
            </div>
        </Container>
    </div>
);