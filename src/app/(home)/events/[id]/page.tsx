import { Suspense } from "react";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/server/actions/event.actions";
import Image from "next/image";
import Details from "../_sections/Details";
import FallbackLoader from "@/components/fallbacks/FallbackLoader";
import Collection from "../../_sections/Collection";

type EventDetailsProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

async function EventDetails({ params, searchParams }: EventDetailsProps) {
  const { id } = params;

  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    eventId: event._id,
    categoryId: event.category._id,
    page: searchParams?.page as string,
  });

  return (
    <div className="pt-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-sm">
          <Image
            src={event.imageUrl}
            alt="event-image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />
        </div>

        <div className="flex flex-1 flex-col gap-8 p-5 px-1 md:p-8">
          <Details event={event} />
        </div>
      </div>

      {/* EVENTS WITH THE SAME CATEGORY */}
      <div className="mb-4 mt-10">
        <h2 className="mb-6 md:mb-8">Related Events</h2>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptySubText="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={relatedEvents?.totalPages}
        />
      </div>
    </div>
  );
}

export default EventDetails;
