import { createOrderFlw } from "@/server/actions/order.action";
import { NextResponse } from "next/server";
import Flutterwave from "flutterwave-node-v3";
import { handleApiError } from "@/utils";

const flw = new Flutterwave(
  process.env.FLW_PUBLIC_KEY,
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
  console.log(payload);

  // Send an immediate 200 response
  const response = NextResponse.json({ message: "OK" }, { status: 200 });
  const expectedAmount = "";
  const expectedCurrency = "NGN";

  const verifyTxn = await flw.Transaction.verify({ id: payload.id });

  if (verifyTxn.data.status !== "successful") {
    // Inform the customer their payment was unsuccessful
    console.error("Payment verification failed");
    return response;
  }

  // Do something (that doesn't take too long) with the payload
  const eventType = payload?.event;
  const data = payload?.data;

  console.log(payload?.data);

  // Perform long-running tasks asynchronously
  setTimeout(async () => {
    // Long-running tasks go here
    console.log("Processing payload:", eventType, data);

    if (eventType === "charge.completed") {
      const { flw_ref: id, amount, payment_type, meta, status } = data;

      const chargedAmount = amount ? amount : 0;

      const order = {
        flwId: id,
        eventId: meta?.eventId,
        buyerId: meta?.buyerId,
        totalAmount: chargedAmount.toString(),
        paymentType: payment_type,
        status,
        createdAt: new Date(),
      };
      try {
        const newOrder = await createOrderFlw(order);

        console.log("Order created successfully:", newOrder);
      } catch (error) {
        return NextResponse.json(
          { message: "Internal Server Error" },
          { status: 500 },
        );
      }
    }
  }, 0);

  return response;
}
