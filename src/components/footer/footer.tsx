import * as React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";
import { NavColumn } from "./nav";
import { Container } from "@/components/container";
import { CopyrightIcon } from "lucide-react";

export const NAV_LINKS_QUERY = graphql`
  query navLinksQuery {
    allNavJson {
      nodes {
        text
        to
      }
    }
  }
`;

export const Footer = () => {
  const navLinks = useStaticQuery(NAV_LINKS_QUERY);

  return (
    <div className="bg-primary text-white">
      <Container as="footer" className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h3 className="font-bold text-2xl">
                <span className="px-2 mr-1 rounded-sm bg-white text-primary">
                  edu
                </span>
                <span className="text-accent">TAP</span>
              </h3>
            </Link>
            <p className="text-sm">
              Transforming campus experiences for the digital campus card of the
              future.
            </p>
            <div className="flex flex-col space-x-4">
              <span className="text-sm">A project by</span>
              <img
                src="/eugloh-white.webp"
                alt="EUGLOH logo"
                className="w-32 object-contain"
              />
            </div>
            <div className="flex items-center gap-1 mt-8 text-sm  text-gray-100">
              <CopyrightIcon className="inline-block size-4" />
              <span>
                {new Date().getFullYear()} eduTAP. All rights reserved.
              </span>
            </div>
          </div>

          <NavColumn
            title="Navigation"
            links={navLinks.allNavJson.nodes.map((node: any) => ({
              href: node.to,
              label: node.text,
            }))}
          />

          <NavColumn
            title="Resources"
            links={[
              { href: "https://docs.edutap.eu/", label: "Documentation" },
              {
                href: "https://github.com/edutap-eu",
                label: "GitHub Repository",
              },
            ]}
          />

          <NavColumn
            title="Legal"
            links={[
              { href: "/legal/privacy-policy", label: "Privacy Policy" },
              { href: "/legal/imprint", label: "Imprint" },
              {
                href: "https://opensource.org/license/eupl-1-2/",
                label: "EUPL License",
              },
            ]}
          />
        </div>
      </Container>
    </div>
  );
};
