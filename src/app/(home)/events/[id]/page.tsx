import { Suspense } from "react";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/server/actions/event.actions";
import Image from "next/image";
import image from "@/images/hero.png";
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

  console.log(event);

  return (
    <div className="px-2 sm:px-4">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="relative">
          <Image
            src={event?.url ?? image}
            alt="hero-image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-contain object-center"
          />
        </div>

        <div className="flex flex-1 flex-col gap-8 px-1 sm:p-10">
          <Details event={event} />
        </div>

        {/* EVENTS WITH THE SAME CATEGORY */}
        <div className="my-8">
          <h2 className="mb-8 md:mb-12">Related Events</h2>
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
    </div>
  );
}

export default EventDetails;
