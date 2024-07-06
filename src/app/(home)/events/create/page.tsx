"use client";
// import { auth, currentUser } from "@clerk/nextjs/server";

import { useState } from "react";
import EventForm from "../_sections/EventForm";

function CreateEvent() {
  // customize your session token
  // const { userId } = auth();
  // const user = await currentUser();
  // const userId = sessionClaims?.userId as string;
  const [test, setTest] = useState("");

  const userId = "";

  console.log(userId);

  return (
    <div className="px-3 pb-4 pt-6 sm:px-6">
      {/* <InputField
        value={test}
        id="title"
        placeholder="Event Title"
        onChange={(e) => setTest(e.target.value)}
      /> */}
      <EventForm type="Create" userId={userId!} />
    </div>
  );
}

export default CreateEvent;
