import { Button } from "@/components/Button";
import { checkoutOrder } from "@/server/actions/order.action";
import { IEvent } from "@/server/database/models/event.model";

import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";

// loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Checkout({ event, userId }: { event: IEvent; userId: string }) {
  const label = event?.isFree ? "Get Ticket" : "Buy Ticket";

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
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

  const onCheckout = async () => {
    const order = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };

    await checkoutOrder(order);
  };

  return (
    <div></div>
    // <form action={onCheckout} method="POST">
    //   <Button
    //     type="submit"
    //     title={label}
    //     className="mt-3 w-fit px-6 py-2 sm:mt-5"
    //   />
    // </form>
  );
}

export default Checkout;
