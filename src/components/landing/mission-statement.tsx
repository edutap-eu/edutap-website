import {Container} from "@/components/container";
import {CheckIcon, ShieldIcon, SmartphoneIcon, UsersIcon} from "lucide-react";
import * as React from "react";

export const MissionStatement = () => (
    <div className="bg-gradient-to-b from-secondary/50 py-16 md:py-36">
        <Container size="sm" as='section'
                   className=" bg-white flex flex-col items-center py-16 md:py-36 rounded-xl md:drop-shadow-xl px-8 md:px-4">
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4">
                Our Mission
            </h2>

            <p className="text-center text-xl text-gray-700 max-w-lg mb-12">
                Our mission is to fulfill the interoperability vision of the European Student Card.
            </p>

            <div className="space-y-16 max-w-2xl">
                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
                        <div className="w-20 h-20 flex items-center justify-center bg-primary rounded-md">
                            <SmartphoneIcon className="w-10 h-10 text-primary-foreground" strokeWidth={2}/>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Digital First. Campus Ready.</h3>
                        <p className="text-gray-600 text-lg">
                            We are developing the digital campus card of the future for the smartphone.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
                        <div className="w-20 h-20 flex items-center justify-center bg-primary rounded-md">
                            <UsersIcon className="w-10 h-10 text-primary-foreground" strokeWidth={2}/>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">For Everyone. Without
                            Exception.</h3>
                        <p className="text-gray-600 text-lg">
                            For every member of the higher education community, students, faculty, staff
                            and affiliates.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-10">
                        <div className="w-20 h-20 flex items-center justify-center bg-primary  rounded-md">
                            <ShieldIcon className="w-10 h-10 text-primary-foreground" strokeWidth={2}/>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight mb-2">Smart. Seamless. Secure.</h3>
                        <p className="text-gray-600 text-lg">
                            eduTAP is your educational ID and a collection of service passes in the
                            digital wallet.
                        </p>
                    </div>
                </div>
            </div>

            <h2 className="text-4xl font-bold tracking-tight pt-16 mb-4">
                Project Goals
            </h2>

            <p className="text-center text-xl text-gray-700 max-w-lg mb-12">
                The following goals guide the development of eduTAP.
            </p>

            <ul className="max-w-2xl grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4">
                {[
                    "For Europe and the world",
                    "Decentralized, secure and <abbr title='state of the art'>SOTA</abbr>",
                    "Compliant (e.g. GDPR, vendor-neutral)",
                    "Easy updates and maintenance",
                    "Accessible to all users",
                    "Follows European jurisdiction requirements",
                    "Community-governed, free and open-source software",
                    "Favorable adaptation possible"
                ].map((goal, index) => (
                    <li key={index} className="flex items-center max-w-sm">
                        <div
                            className="w-8 h-8 flex-shrink-0 rounded-full bg-primary flex items-center justify-center mr-3 mt-0.5">
                            <CheckIcon className="size-4 text-white"/>
                        </div>
                        <p className="text-gray-700" dangerouslySetInnerHTML={{__html: goal}}></p>
                    </li>
                ))}
            </ul>
        </Container>
    </div>
)