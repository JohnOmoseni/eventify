"use client";

import { Button } from "@/components/Button";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import { IEvent } from "@/server/database/models/event.model";
import { v4 as uuid } from "uuid";
import { handleApiError, toastNotify } from "@/utils";
import { useToast } from "@/components/ui/use-toast";

function TestCheckout({
  event,
  userId,
  user,
}: {
  event: IEvent;
  userId: string;
  user: any;
}) {
  const { toast } = useToast();

  const label = event?.isFree ? "Get Ticket" : "Buy Ticket";
  const price = event.isFree ? 0 : Number(event.price);

  const order = {
    eventTitle: event.title,
    eventId: event._id,
    eventDesc: event.description,
    eventLogo: event.imageUrl,
    buyerId: userId,
    isFree: event.isFree,
  };

  const config = {
    public_key: process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY!,
    tx_ref: uuid(),
    amount: price,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    redirect_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
    customer: {
      email: user?.emailAddresses[0].emailAddress as string,
      name: user?.username || `${user?.firstName} ${user?.lastName}`,
      phone_number: user?.phoneNumbers[0].phoneNumber as string,
    },
    meta: { eventId: order.eventId, buyerId: order.buyerId },
    customizations: {
      title: order.eventTitle,
      description: order.eventDesc,
      logo: order.eventLogo,
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  console.log("Initializing Order", order, config, handleFlutterPayment);

  const onCheckout = async () => {
    try {
      handleFlutterPayment({
        callback: async (res) => {
          if (res.status.includes("successful")) {
            console.log("Transaction successful", res);
          }

          closePaymentModal(); // this will close the modal programmatically
        },
        onClose: () => {
          console.log("Transaction canceled");
        },
      });
    } catch (error) {
      toastNotify(toast, "Something went wrong", "Please try again");
      handleApiError(error);
    }
  };

  return (
    <form action={onCheckout} method="POST">
      <Button
        type="submit"
        title={label}
        className="mt-3 w-fit px-6 py-2 sm:mt-5"
      />
    </form>
  );
}

export default TestCheckout;
