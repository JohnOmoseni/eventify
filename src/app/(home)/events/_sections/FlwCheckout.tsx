"use client";

import { Button } from "@/components/Button";
import { checkoutOrderFlw } from "@/server/actions/order.action";
import { IEvent } from "@/server/database/models/event.model";
import { useEffect } from "react";

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

  useEffect(() => {
    // Check to see if this is a redirect back from FlwCheckout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready.",
      );
    }
  }, []);

  const onCheckoutFlw = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
      eventDesc: event.description,
      eventLogo: event.imageUrl,
      user: {
        email: user?.emailAddresses[0].emailAddress as string,
        name: user?.username || `${user.firstName} ${user?.lastName}`,
        phoneNumber: user?.phoneNumbers[0]?.phoneNumber as string,
      },
    };

    await checkoutOrderFlw(order);
  };

  return (
    <form action={onCheckoutFlw} method="POST">
      <Button
        title={label}
        type="submit"
        className="mt-3 w-fit px-6 py-2 sm:mt-5"
      />
    </form>
  );
}

export default FlwCheckout;
