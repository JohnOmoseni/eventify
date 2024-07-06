import { Button } from "@/components/Button";
import { Calendar, Location } from "@/constants/icons";
import { formatDateTime } from "@/lib/utils";
import { IEvent } from "@/server/database/models/event.model";
import { twMerge } from "tailwind-merge";
import CheckoutButton from "./CheckoutButton";

function Details({ event }: { event: IEvent }) {
  return (
    <>
      {" "}
      <div className="flex-column gap-3">
        <h2>{event?.title}Github Universe 2023</h2>

        <div className="row-flex-start gap-2">
          <p
            className={twMerge(
              "badge",
              "bg-green-500/30 px-6 py-1.5 text-green-700 hover:bg-green-500/50 focus:ring-green-400",
            )}
          >
            {event?.isFree ? "FREE" : `$${event?.price}100`}
          </p>
          <p
            className={twMerge(
              "badge",
              "truncate bg-neutral-500/20 px-6 text-neutral-500 hover:bg-neutral-500/50 focus:ring-neutral-400",
            )}
          >
            {event?.category?.name}
            Development
          </p>
        </div>
        <p className="ml-1 text-sm leading-4">
          <span className="font-semibold">by </span>
          <span className="font-medium">
            {event?.organizer?.firstName} {event?.organizer?.lastName}
            Adrian | JS Mastery
          </span>
        </p>

        <CheckoutButton event={event} />
        <Button title="Buy Ticket" className="mt-3 px-6 py-2 sm:mt-5" />

        <div className="flex-column mt-4 gap-4">
          <div className="row-flex-start gap-2 md:gap-3">
            <span className="icon self-start">
              <Calendar size={20} className="mt-0.5" />
            </span>
            <div className="row-flex-start flex-wrap gap-1 text-sm">
              <p className="font-medium">
                {formatDateTime(event?.startDateTime).dateOnly} - &nbsp;
                {formatDateTime(event?.startDateTime).timeOnly} Tue, Dec 20,
                2023 / 12:25PM - 12:25PM
              </p>
              <p className="font-medium">
                {formatDateTime(event?.endDateTime).dateOnly} - &nbsp;
                {formatDateTime(event?.endDateTime).timeOnly} Tue, Dec 19, 2023
                / 12:25PM - 12:25PM
              </p>
            </div>
          </div>

          <div className="row-flex-start gap-2 md:gap-3">
            <span className="icon start">
              <Location size={20} className="mt-0.5" />
            </span>
            <p className="text-sm font-medium">
              {event?.location} Houston Space Center, TX
            </p>
          </div>
        </div>
      </div>
      <div className="sm:mt-4">
        <h3 className="">What you'll learn:</h3>
        <p className="mt-3 text-base">
          {event?.description} Lorem ipsum dolor sit amet consectetur,
          adipisicing elit. Consectetur deleniti tenetur facere eum nisi fuga
          magni accusamus amet nesciunt corrupti. Eveniet magni minima eum enim
          eius perferendis qui adipisci modi!
        </p>
        <p className="mt-2 truncate text-sm text-secondary underline">
          {event?.url} https://event.google.com
        </p>
      </div>
    </>
  );
}

export default Details;
