import * as React from "react";

export type GithubMarkProps = {
    className?: string;
    inverted?: boolean;
}

export const GithubMark = ({className, inverted = false}: GithubMarkProps) =>
    inverted ? (
        <img className={className} src="/github-mark-white.svg" alt="GitHub"/>
    ) : (
        <img className={className} src="/github-mark.svg" alt="GitHub"/>
    );

