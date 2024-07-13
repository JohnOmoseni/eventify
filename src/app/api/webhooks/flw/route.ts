import { handleApiError } from "@/lib/utils";
import { createOrder } from "@/server/actions/order.action";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  // If you specified a secret hash, check for the signature
  const secretHash = process.env.FLW_SECRET_HASH!;
  const signature = request.headers.get("verif-hash");

  if (!signature || signature !== secretHash) {
    // This request isn't from Flutterwave; discard
    return NextResponse.json({ message: "Forbidden" }, { status: 401 });
  }

  const payload = body; // It's a good idea to log all received events.
  console.log(payload);
  // Send an immediate 200 response
  const response = NextResponse.json({ message: "OK" }, { status: 200 });

  // Do something (that doesn't take too long) with the payload
  const eventType = payload?.event;
  const data = payload?.data;

  // Perform long-running tasks asynchronously
  setTimeout(async () => {
    // Long-running tasks go here
    console.log("Processing payload:", payload);
    // Example: You could dispatch a job to a job queue here

    if (eventType === "charge.completed") {
      const { flw_ref: id, amount, payment_type, customer, meta } = data;

      const order = {
        flwId: id,
        eventId: meta?.eventId || "",
        buyerId: meta?.buyerId || "",
        totalAmount: amount ? amount.toString() : "0",
        createdAt: new Date(),
      };
      try {
        const newOrder = await createOrder(order);
        console.log("Order created successfully:", newOrder);
      } catch (error) {
        handleApiError(error);
      }
    }
  }, 0);

  return response;
}
