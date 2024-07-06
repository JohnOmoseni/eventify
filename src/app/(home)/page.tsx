import { Suspense } from "react";
import { getAllEvents } from "@/server/actions/event.actions";
import Hero from "./_sections/Hero";
import Collection from "./_sections/Collection";
import FallbackLoader from "@/components/fallbacks/FallbackLoader";

export default async function Home() {
  const events = await getAllEvents({
    query: "",
    page: 1,
    category: "",
    limit: 6,
  });

  console.log(events);

  return (
    <main>
      <Hero />

      <Suspense fallback={<FallbackLoader />}>
        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptySubText="Come back later"
          collectionType="All_Events"
          limit={6}
          page={1}
          totalPages={events?.totalPages}
        />
      </Suspense>
    </main>
  );
}
