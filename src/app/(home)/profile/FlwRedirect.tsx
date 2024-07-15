"use client";

import { useToast } from "@/components/ui/use-toast";
import { toastNotify } from "@/utils";
import { useEffect } from "react";

function FlwRedirect() {
  const { toast } = useToast();

  useEffect(() => {
    // Check to see if this is a redirect back from FlwCheckout
    const query = new URLSearchParams(window.location.search);
    console.log(query);

    if (query.get("status") === "successful") {
      toastNotify(toast, "Order placed!", "");
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("status") === "failed") {
      toastNotify(
        toast,
        "Order canceled -- continue to shop around and checkout when you’re ready.",
        "",
      );

      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready.",
      );
    }
  }, []);

  return null;
}

export default FlwRedirect;
