import { createOrderFlw } from "@/server/actions/order.action";
import { NextResponse } from "next/server";
import MetaData from "@/server/database/models/metadata.model";
import { CreateOrderParamsFlw } from "@/types/actionTypes";

export async function POST(request: Request) {
  // If you specified a secret hash, check for the signature
  const secretHash = process.env.FLW_SECRET_HASH!;
  const signature = request.headers.get("verif-hash");

  if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave; discard
    return NextResponse.json({ message: "Forbidden" }, { status: 401 });
  }

  try {
    const payload = await request.json();

    // Send an immediate 200 response
    const response = NextResponse.json(
      { message: "Webhook received successfully!" },
      { status: 200 },
    );

    // Process the webhook data asynchronously
    processWebhook(payload);

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: "Error processing webhook", error: error.message },
      { status: 500 },
    );
  }
}

// Function to process the webhook data asynchronously
async function processWebhook(payload: any) {
  const eventType = payload?.event;
  const data = payload?.data;

  // Perform long-running tasks asynchronously - Long-running tasks go here
  // setTimeout(async () => {
  console.log("Processing payload:", eventType, data);

  // if (eventType === "charge.completed") {
  const { flw_ref, id, tx_ref, amount, payment_type, status } = data;

  console.log("running");
  try {
    const metadata = await MetaData.findOne({ tx_reference: tx_ref });
    console.log(metadata);

    // if (metadata) {
    const { eventId, buyerId } = metadata;
    const chargedAmount = amount ? amount : 0;

    const order: CreateOrderParamsFlw = {
      txnId: id,
      flwId: flw_ref,
      event: eventId,
      buyer: buyerId,
      totalAmount: chargedAmount.toString(),
      paymentType: payment_type,
      status,
      createdAt: new Date(),
    };
    console.log("Adding to db", order, metadata);

    const newOrder = await createOrderFlw(order);
    console.log("Order created successfully:", newOrder);
    // } else {
    //   console.error("Metadata not found for transaction reference:", tx_ref);
    // }
  } catch (error: any) {
    console.error("Error processing webhook data:", error.message);
  }
  // }
}
