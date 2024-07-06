import { Suspense } from "react";
import { Button } from "@/components/Button";
import { auth } from "@clerk/nextjs/server";
import { getEventsByUser } from "@/server/actions/event.actions";
import Link from "next/link";
import Collection from "../_sections/Collection";
import FallbackLoader from "@/components/fallbacks/FallbackLoader";

async function Profile() {
  const { userId } = auth();

  console.log(userId);

  // if (!userId) return null;

  // // events organized by user
  // const events = await getEventsByUser({
  //   userId: userId!,
  //   limit: 10,
  //   page: 1,
  // });

  const events = { data: [] };

  return (
    <>
      <div className="flex-column gap-6">
        <div className="row-flex w-full gap-4 p-6 sm:!justify-between md:px-8 md:py-12">
          <h2 className="sm:text-left">My Tickets</h2>
          <Link href="/#events" className="">
            <Button title="Explore more Event" className="hidden sm:flex" />
          </Link>
        </div>

        <section className="my-6 self-center">
          <Suspense fallback={<FallbackLoader />}>
            <Collection
              data={events?.data}
              emptyTitle="No Events purchased yet"
              emptySubText="No worries - plenty exciting events to explore..."
              collectionType="My_Events"
              limit={3}
              page={1}
              urlParamName="ordersPage"
              totalPages={2}
            />
          </Suspense>
        </section>
      </div>

      <div className="flex-column gap-6">
        <div className="row-flex w-full gap-4 p-6 sm:!justify-between md:px-8 md:py-12">
          <h3 className="sm:text-left">Events Organized</h3>
          <Link href="/events/create" className="">
            <Button title="Create New Event" className="hidden sm:flex" />
          </Link>
        </div>
        <section className="my-6 self-center">
          <Suspense fallback={<FallbackLoader />}>
            <Collection
              data={events?.data}
              emptyTitle="No Events have been created yet"
              emptySubText="Go create some now..."
              collectionType="Events_Organized"
              limit={6}
              page={1}
              urlParamName="eventsPage"
              totalPages={2}
            />
          </Suspense>
        </section>
      </div>
    </>
  );
}

export default Profile;
