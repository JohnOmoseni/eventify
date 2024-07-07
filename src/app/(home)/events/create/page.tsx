import { auth, currentUser } from "@clerk/nextjs/server";

import EventForm from "../_sections/EventForm";

async function CreateEvent() {
  // customize your session token
  const { userId }: { userId: string | null } = auth();
  const user = await currentUser();

  console.log("UserID:", userId);

  return (
    <div className="px-3 pb-4 pt-6 sm:px-6">
      <EventForm type="Create" userId={userId!} />
    </div>
  );
}

export default CreateEvent;
