// import { auth, currentUser } from "@clerk/nextjs/server";
"use client";

import EventForm from "../_sections/EventForm";

async function CreateEvent() {
  // customize your session token
  // const { userId } = auth();
  // const user = await currentUser();
  // const userId = sessionClaims?.userId as string;

  const userId = "";

  console.log(userId);

  return (
    <div className="px-3 pb-4 pt-6 sm:px-6">
      <EventForm type="Create" userId={userId!} />
    </div>
  );
}

export default CreateEvent;
