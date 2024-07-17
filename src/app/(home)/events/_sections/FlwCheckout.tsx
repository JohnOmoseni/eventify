"use client";

import { Button } from "@/components/Button";
import { createMetadata } from "@/server/actions/metadata.actions";
import { checkoutOrderFlw } from "@/server/actions/order.action";
import { IEvent } from "@/server/database/models/event.model";
import { FormEvent } from "react";

function FlwCheckout({
  event,
  user,
  userId,
}: {
  event: IEvent;
  user: any;
  userId: string;
}) {
  const label = event?.isFree ? "Get Ticket" : "Buy Ticket";

  const onCheckoutFlw = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const metadata = {
      eventId: event._id,
      buyerId: userId,
    };

    const { tx_reference } = await createMetadata(metadata);
    if (!tx_reference) console.log("Tranasaction reference not created");

    const order = {
      tx_reference,
      eventTitle: event.title,
      price: event.price,
      isFree: event.isFree,
      eventDesc: event.description,
      eventLogo: event.imageUrl,
      user: {
        email: user?.emailAddresses[0].emailAddress as string,
        name: user?.username || `${user?.firstName} ${user?.lastName}`,
        phoneNumber: user?.phoneNumbers[0]?.phoneNumber as string,
      },
    };
    console.log("Initializing Order", order);

    await checkoutOrderFlw(order);
  };

  return (
    <form onSubmit={onCheckoutFlw}>
      <Button
        title={label}
        type="submit"
        className="mt-3 w-fit px-6 py-2 sm:mt-5"
      />
    </form>
  );
}

export default FlwCheckout;
