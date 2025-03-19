import {CreditCardIcon, KeyIcon, UserCircleIcon} from "lucide-react";
import {Container} from "@/components/container";
import * as React from "react";

export const FeatureGrid = () => (
    <Container size='lg' as='section' className='py-16 md:py-36'>
        <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-center mb-16">
            <span className="text-primary">One Tap.</span>{' '}
            <span className="text-accent">Many Possibilities.</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <div
                className="rounded-lg shadow-md bg-gradient-to-br from-primary to-primary/80 p-8 text-white hover:shadow-lg transition-shadow">
                <div className="mb-6">
                    <UserCircleIcon size={48} className="text-white" strokeWidth={2}/>
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">Tap to Identify</h3>
                <p className="text-white opacity-90 font-medium">Quickly verify your identity with a simple tap
                    of your device.</p>
            </div>

            <div
                className="rounded-lg shadow-md bg-gradient-to-br from-secondary to-secondary/70 p-8 text-white hover:shadow-lg transition-shadow">
                <div className="mb-6">
                    <KeyIcon size={48} className="text-white" strokeWidth={2}/>
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">Tap to Access</h3>
                <p className="text-white opacity-90 font-medium">Access buildings, borrow library books, and use
                    transportation with your smartphone.</p>
            </div>

            <div
                className="rounded-lg shadow-md bg-gradient-to-br from-accent to-accent/80 p-8 text-white hover:shadow-lg transition-shadow">
                <div className="mb-6">
                    <CreditCardIcon size={48} className="text-white" strokeWidth={2}/>
                </div>
                <h3 className="text-xl font-bold mb-3 uppercase">Tap to Pay</h3>
                <p className="text-white opacity-90 font-medium">Claim student discounts on campus and beyond
                    with a simple
                    tap, no cards or cash needed.</p>
            </div>
        </div>
    </Container>
)