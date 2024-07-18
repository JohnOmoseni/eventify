"use client";

import { useToast } from "@/components/ui/use-toast";
import { createOrder } from "@/server/actions/order.action";
import { toastNotify } from "@/utils";
import { useEffect } from "react";

function FlwRedirect() {
  const { toast } = useToast();
  const query = new URLSearchParams(window.location.search);

  useEffect(() => {
    // Check to see if this is a redirect back from FlwCheckout

    const mutateOrderList = async () => {
      if (query.get("status") === "successful") {
        const tx_reference = query.get("tx_ref");
        const transactionId = query.get("transaction_id");
        const response = await createOrder(tx_reference!, transactionId!);

        toastNotify(toast, "Order placed!", "");
        console.log(response);
      } else if (query.get("status") === "cancelled") {
        toastNotify(
          toast,
          "Order canceled -- continue to shop around and checkout when you’re ready.",
        );
      } else {
        toastNotify(toast, "An error occurred", "Please try again.");
      }
    };

    mutateOrderList();

    // Cleanup function to clear URL search parameters
    return () => {
      const url = new URL(window.location.href);
      url.search = ""; // Clear all search parameters
      window.history.replaceState({}, document.title, url);
    };
  }, []);

  return null;
}

export default FlwRedirect;
