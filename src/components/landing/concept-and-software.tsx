import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {
    BuildingIcon,
    FingerprintIcon,
    KeyRoundIcon,
    LayersIcon,
    LockOpenIcon,
    PackageOpenIcon,
    UsersIcon,
    WalletIcon
} from "lucide-react";
import {Container} from "@/components/container";
import * as React from "react";

export const ConceptAndSoftware = () => (
    <Container className="py-16 md:py-36">
        <h2 className="text-4xl font-bold tracking-tight text-center mb-4">
            <span className="text-primary">One Coin</span>,{' '}
            <span className="text-accent">Two Sides</span>
        </h2>

        <p className="text-center text-xl text-gray-700 max-w-lg mb-12 mx-auto">
            More than just a concept, eduTAP is a community-driven project that builds on the vision to create
            a <a href="https://education.ec.europa.eu/about-eea/the-eea-explainedEuropean Education Area."
                 className="text-accent hover:underline">European Education Area</a>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* eduTAP the Concept Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl text-primary">eduTAP the Concept</CardTitle>
                    <CardDescription className="text-lg pt-2">
                        Reimagining campus identity for the digital age
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {[
                        {
                            icon: WalletIcon,
                            text: () => <p className="text-gray-700">Leveraging the full potential of digital
                                wallets and smart devices to create a seamless campus experience without physical
                                cards.</p>
                        },
                        {
                            icon: LayersIcon,
                            text: () => <>
                                <p className="text-gray-700">Using a divide-and-conquer principle to transform
                                    traditional campus cards into:</p>
                                <ul className="list-disc ml-8">
                                    <li className="text-gray-600 text-sm">
                                        A harmonized identity pass using Verifiable Credentials
                                        (<a href="https://www.iso.org/standard/69084.html"
                                            className="text-accent hover:underline">ISO/IEC 18013-5</a>)
                                    </li>
                                    <li className="text-gray-600 text-sm">
                                        Separate service passes for individual on-site services
                                    </li>
                                    <li className="text-gray-600 text-sm">
                                        Service passes accessible via eduGAIN-Login with centralized discovery
                                    </li>
                                </ul>
                            </>
                        },
                        {
                            icon: LockOpenIcon,
                            text: () => <p className="text-gray-700">Let service providers decide the base
                                technology of the pass, based on their needs and security requirements</p>
                        },
                        {
                            icon: BuildingIcon,
                            text: () => <p className="text-gray-700">Enabling on-site service access to all members
                                in the Higher Education Community without exception.</p>
                        }
                    ].map(({icon: Icon, text: Text}, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <div className="mt-1 bg-gray-400 rounded-full p-1 shrink-0">
                                <Icon className="h-5 w-5 text-white"/>
                            </div>
                            <div>
                                <Text/>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* eduTAP the Software Card */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl text-accent">eduTAP the Software</CardTitle>
                    <CardDescription className="text-lg pt-2">
                        Open-source solutions for modern campus needs
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-gray-700">
                        The eduTAP software is built by the community to enable Higher Education Institutions
                        to:
                    </p>
                    {[
                        {
                            icon: FingerprintIcon,
                            text: () => <p className="text-gray-700">Create, issue and manage digital identity
                                passes for students, staff, and guests</p>
                        },
                        {
                            icon: KeyRoundIcon,
                            text: () => <p className="text-gray-700">
                                Enable access control to services, facilities, and resources with wallet passes
                            </p>
                        },
                        {
                            icon: PackageOpenIcon,
                            text: () => <p className="text-gray-700">
                                Software is distributed as open source, primarily under the{' '}
                                <a href="https://opensource.org/license/eupl-1-2/"
                                   className="text-accent hover:underline">
                                    European Union Public Licence v. 1.2
                                </a> (EUPL)
                            </p>
                        },
                        {
                            icon: UsersIcon,
                            text: () => <p className="text-gray-700">
                                Community-driven development. Join us on <a href="https://github.com/edutap-eu"
                                                                            className="text-accent hover:underline">
                                GitHub</a> to contribute.
                            </p>
                        }
                    ].map(({icon: Icon, text: Text}, index) => (
                        <div key={index} className="flex items-center gap-3">
                            <div className="bg-gray-400 rounded-full p-1 shrink-0">
                                <Icon className="h-5 w-5 text-white"/>
                            </div>
                            <Text/>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    </Container>
);