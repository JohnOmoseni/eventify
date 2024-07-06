"use client";

import { Button } from "@/components/Button";
import { IEvent } from "@/server/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import Link from "next/link";
import Checkout from "./Checkout";

function CheckoutButton({ event }: { event: IEvent }) {
  const hasEventEnded = new Date(event?.endDateTime) < new Date();
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="row-flex gap-3">
      {hasEventEnded ? (
        <p className="text-sm text-red-400">
          {" "}
          Sorry! Tickets are no longer available
        </p>
      ) : (
        <>
          <SignedOut>
            <Link href="/sign-in">
              <Button
                title="Get Tickets"
                className="mt-3 w-fit px-6 py-2 sm:mt-5"
              />
            </Link>
          </SignedOut>
          <SignedIn>
            <Checkout event={event} userId={userId} user={user} />
          </SignedIn>
        </>
      )}
    </div>
  );
}

export default CheckoutButton;
