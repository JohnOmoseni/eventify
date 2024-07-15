import { Suspense } from "react";
import { getAllEvents } from "@/server/actions/event.actions";
import { SearchParamProps } from "@/types/actionTypes";
import Hero from "./_sections/Hero";
import Collection from "./_sections/Collection";
import FallbackLoader from "@/components/fallbacks/FallbackLoader";
import Search from "./_sections/Search";
import CategoryFilter from "./_sections/CategoryFilter";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams.page) || 1;
  const query = (searchParams.query as string) || "";
  const category = (searchParams.category as string) || "";

  const limit = 10;

  const events = await getAllEvents({
    query,
    category,
    page: page,
    limit,
  });

  console.log(events);

  return (
    <>
      <Hero />

      <section id="events" className="flex-column my-12 gap-8 max-sm:px-3">
        <h2 className="w-full max-sm:text-center">
          Trusted by <br /> Thousands of Events
        </h2>

        <div className="flex-column sm:row-flex w-full gap-4">
          <Search />
          <CategoryFilter />
        </div>

        <Suspense fallback={<FallbackLoader />}>
          <Collection
            data={events?.data}
            emptyTitle="No Events Found"
            emptySubText="Come back later"
            collectionType="All_Events"
            limit={limit}
            page={page}
            totalPages={events?.totalPages}
          />
        </Suspense>
      </section>
    </>
  );
}
