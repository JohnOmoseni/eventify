import { auth } from "@clerk/nextjs/server";
import EventForm from "../_sections/EventForm";

async function CreateEvent() {
  // customize your session token
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  // returns the clerkId:  const { userId }: { userId: string | null } = auth();

  console.log("UserID:", userId);

  return (
    <div className="px-3 pb-4 pt-6 sm:px-6">
      <EventForm type="Create" userId={userId} />
    </div>
  );
}

export default CreateEvent;
