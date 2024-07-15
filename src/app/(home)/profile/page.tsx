import Link from "next/link";
import Collection from "../_sections/Collection";
import BackArrow from "@/components/BackArrow";
import FallbackLoader from "@/components/fallbacks/FallbackLoader";
import { Suspense } from "react";
import { Button } from "@/components/Button";
import { auth } from "@clerk/nextjs/server";
import { getEventsByUser } from "@/server/actions/event.actions";
import { getOrdersByUser } from "@/server/actions/order.action";
import { SearchParamProps } from "@/types/actionTypes";
import { IOrder } from "@/server/database/models/order.model";
import FlwRedirect from "./FlwRedirect";

async function Profile({ searchParams }: SearchParamProps) {
  // customize your session token
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const ordersPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const orders = await getOrdersByUser({ userId, page: ordersPage });
  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  const orderedEvents = orders?.data.map((order: IOrder) => order.event) || [];

  return (
    <>
      <div className="max-w-max">
        <BackArrow />
      </div>

      <FlwRedirect />

      <div className="flex-column sm:px-4">
        <div className="row-flex w-full gap-4 py-8 sm:!justify-between md:py-12">
          <h3 className="sm:text-left">My Tickets</h3>
          <Link href="/#events" className="hidden sm:flex">
            <Button title="Explore more Event" className="min-w-[160px] px-4" />
          </Link>
        </div>

        <section className="w-full">
          <Suspense fallback={<FallbackLoader />}>
            <Collection
              data={orderedEvents}
              emptyTitle="No event tickets purchased yet"
              emptySubText="No worries - plenty exciting events to explore..."
              collectionType="My_Events"
              limit={3}
              page={ordersPage}
              urlParamName="ordersPage"
              totalPages={orders?.totalPages}
            />
          </Suspense>
        </section>
      </div>

      <div className="flex-column sm:px-4">
        <div className="row-flex w-full gap-4 py-8 sm:!justify-between md:py-12">
          <h3 className="sm:text-left">Events Organized</h3>
          <Link href="/events/create" className="hidden sm:flex">
            <Button title="Create New Event" className="min-w-[160px] px-4" />
          </Link>
        </div>
        <section className="w-full">
          <Suspense fallback={<FallbackLoader />}>
            <Collection
              data={organizedEvents?.data}
              emptyTitle="No Events have been created yet"
              emptySubText="Go create some now..."
              collectionType="Events_Organized"
              limit={3}
              page={eventsPage}
              urlParamName="eventsPage"
              totalPages={organizedEvents?.totalPages}
            />
          </Suspense>
        </section>
      </div>
    </>
  );
}

export default Profile;
