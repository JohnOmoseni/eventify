import EventForm from "../../_sections/EventForm";
import { auth, currentUser } from "@clerk/nextjs/server";
import { getEventById } from "@/server/actions/event.actions";

async function UpdateEvent({ params }: { params: { id: string } }) {
  const { id } = params;
  const event = await getEventById(id);

  // customize your session token
  const { userId } = auth();
  const user = await currentUser();
  // const userId = sessionClaims?.userId as string;

  return (
    <div className="px-3 pb-4 pt-6 sm:px-6">
      <EventForm
        event={event}
        eventId={event?._id}
        type="Update"
        userId={userId!}
      />
    </div>
  );
}

export default UpdateEvent;
