import {
  BookOpenIcon,
  BusIcon,
  CreditCardIcon,
  KeyIcon,
  TicketPercentIcon,
  UserCircleIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/container";
import * as React from "react";

export const FeatureGrid = () => (
  <Container size="lg" as="section" className="py-16 md:py-36 items-center">
    <h2 className="scroll-m-20 text-4xl font-bold tracking-tight text-center mb-16">
      <span className="text-primary">One Tap.</span>{" "}
      <span className="text-accent">Many Possibilities.</span>
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      <div className="rounded-lg shadow-md bg-gradient-to-br from-primary to-primary/80 p-8 text-white hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <UserCircleIcon size={48} className="text-white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold mb-3">tap to identify</h3>
        <p className="text-white opacity-90 font-medium">
          Quickly verify your identity with a simple tap of your device. With
          Selective Disclosure Verifiable Credentials, you control what
          information to share.
        </p>
        <p>On and off campus, to access a variety of services and locations.</p>
      </div>

      <div className="rounded-lg shadow-md bg-gradient-to-br from-accent to-accent/80 p-8 text-white hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <KeyIcon size={48} className="text-white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold mb-3">tap to open a door</h3>
        <p className="text-white opacity-90 font-medium">
          with the tap of a device, unlock secure access to:
        </p>
        <ul className="list-disc list-inside mt-2">
          <li>buildings</li>
          <li>class rooms</li>
          <li>labs</li>
          <li>computer rooms</li>
          <li>learning spaces</li>
          <li>parking garages</li>
          <li>dorm rooms</li>
          <li>athletic facilities</li>
          <li>and more...</li>
        </ul>
      </div>

      <div className="rounded-lg shadow-md bg-gradient-to-br from-primary to-primary/80 p-8 text-white hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <CreditCardIcon size={48} className="text-white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold mb-3">tap to pay</h3>
        <p className="text-white opacity-90 font-medium">
          You can use your device to pay almost anywhere. At campus dining,
          vending machines, printers, bookstores, and more - on and off campus.
        </p>
        <p>
          A single or a double tap - to prove your status and claim your
          discount - is all it takes.
        </p>
        <p>All possible payment methods are supported.</p>
        <ul className="list-disc list-inside mt-2">
          <li>your regular credit or debit card (open-loop payment)</li>
          <li>your campus prepaid card (closed-loop payment)</li>
          <li>coupons and vouchers</li>
        </ul>
      </div>

      <div className="rounded-lg shadow-md bg-gradient-to-br from-accent to-accent/80 p-8 text-white hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <BookOpenIcon size={48} className="text-white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold mb-3">tap to lend a book</h3>
        <p className="text-white opacity-90 font-medium">
          Libraries with their books and media are the physical representation
          of knowledge and learning. With a simple tap, borrow books and other
          media.
        </p>
      </div>

      <div className="rounded-lg shadow-md bg-gradient-to-br from-primary to-primary/80 p-8 text-white hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <BusIcon size={48} className="text-white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold mb-3">tap to ride</h3>
        <p className="text-white opacity-90 font-medium">
          Ride the campus shuttle or take the public transport.
          Also works for car, bike and scooter sharing.
        </p>
      </div>

      <div className="rounded-lg shadow-md bg-gradient-to-br from-accent to-accent/80 p-8 text-white hover:shadow-lg transition-shadow">
        <div className="mb-6">
          <TicketPercentIcon size={48} className="text-white" strokeWidth={2} />
        </div>
        <h3 className="text-xl font-bold mb-3">tap to claim a discount</h3>
        <p className="text-white opacity-90 font-medium">
          Claim a discount on campus and beyond, by proving your student status
          with a simple tap.
        </p>
      </div>
    </div>

    <p className="text-center text-xl text-gray-700 max-w-2xl mx-auto mt-16">
      All with the tap of your device. No app, no physical card, no hassle -
      just tap. All your passes and credentials in one place - your smartphone
      or wearable device - ready when you need them.
    </p>
    <p className="text-center">
      <Badge className="text-lg mb-6 px-8 py-2 mt-8 mx-auto">
        no app, <strong>just tap!</strong>
      </Badge>
    </p>
  </Container>
);
