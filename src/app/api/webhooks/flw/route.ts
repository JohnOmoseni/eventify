import { createOrderFlw } from "@/server/actions/order.action";
import { NextResponse } from "next/server";
import { handleApiError } from "@/utils";
import Flutterwave from "flutterwave-node-v3";
import MetaData from "@/server/database/models/metadata.model";

const flw = new Flutterwave(
  process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY,
  process.env.FLW_SECRET_KEY,
);

export async function POST(request: Request) {
  // If you specified a secret hash, check for the signature
  const secretHash = process.env.FLW_SECRET_HASH!;
  const signature = request.headers.get("verif-hash");

  if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave; discard
    return NextResponse.json({ message: "Forbidden" }, { status: 401 });
  }
  const payload = await request.json();

  // Send an immediate 200 response
  const response = NextResponse.json(
    { message: "Webhook received successfully!" },
    { status: 200 },
  );

  // Do something (that doesn't take too long) with the payload
  const eventType = payload?.event;
  const data = payload?.data;

  // const verifyTxn = await flw.Transaction.verify({ id: data.id });

  // if (verifyTxn.data.status !== "success") {
  //   // Inform the customer their payment was unsuccessful
  //   console.error("Payment verification failed");
  //   return NextResponse.json(
  //     { message: "Payment verification failed" },
  //     { status: 500 },
  //   );
  // }

  // Perform long-running tasks asynchronously - Long-running tasks go here
  // setTimeout(async () => {
  console.log("Processing payload:", eventType, data);

  if (eventType === "charge.completed") {
    const { flw_ref, id, tx_ref, amount, payment_type, status } = data;

    try {
      const metadata = await MetaData.findOne({ tx_reference: tx_ref });

      if (metadata) {
        const { eventId, buyerId } = metadata;
        const chargedAmount = amount ? amount : 0;

        const order = {
          txnId: id,
          flwId: flw_ref,
          eventId,
          buyerId,
          totalAmount: chargedAmount.toString(),
          paymentType: payment_type,
          status,
          createdAt: new Date(),
        };

        console.log("Adding to db", order, metadata);
        const newOrder = await createOrderFlw(order);
        console.log("Order created successfully:", newOrder);

        return response;
      }
    } catch (error) {
      handleApiError(error);
    }
  }
  // }, 0);

  return response;
}
