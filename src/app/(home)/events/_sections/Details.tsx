import { Button } from "@/components/Button";
import { Calendar, Location, Naira } from "@/constants/icons";
import { IEvent } from "@/server/database/models/event.model";
import { twMerge } from "tailwind-merge";
import CheckoutButton from "./CheckoutButton";
import { formatDateTime } from "@/utils";

function Details({ event }: { event: IEvent }) {
  const nairaSymbol = "\u20A6";
  const price = event?.isFree ? "FREE" : `${nairaSymbol}${event.price}`;

  return (
    <>
      <div className="flex-column gap-3">
        <h2>{event?.title}Github Universe 2023</h2>

        <div className="row-flex-start gap-2">
          <p
            className={twMerge(
              "badge",
              "bg-green-500/30 px-6 py-1.5 text-green-700 hover:bg-green-500/50 focus:ring-green-400",
            )}
          >
            {price}
          </p>
          <p
            className={twMerge(
              "badge",
              "truncate bg-neutral-500/20 px-6 text-neutral-500 hover:bg-neutral-500/50 focus:ring-neutral-400",
            )}
          >
            {event?.category?.name}
          </p>
        </div>
        <p className="ml-1 text-sm leading-4">
          <span className="font-semibold">by </span>
          <span className="font-medium">
            {event?.organizer?.firstName} {event?.organizer?.lastName}
          </span>
        </p>

        <CheckoutButton event={event} />

        <div className="flex-column mt-3 gap-4">
          <div className="row-flex-start gap-2 md:gap-3">
            <span className="icon self-start">
              <Calendar size={20} className="mt-0.5" />
            </span>
            <div className="row-flex-start flex-wrap gap-1 text-sm">
              <p>
                {formatDateTime(event.startDateTime).dateOnly} -{" "}
                {formatDateTime(event.startDateTime).timeOnly}
              </p>
              <p>
                {formatDateTime(event.endDateTime).dateOnly} -{" "}
                {formatDateTime(event.endDateTime).timeOnly}
              </p>
            </div>
          </div>

          <div className="row-flex-start gap-2 md:gap-3">
            <span className="icon start">
              <Location size={20} className="mt-0.5" />
            </span>
            <p className="text-sm font-medium">{event?.location}</p>
          </div>
        </div>
      </div>

      <div className="sm:mt-3">
        <h3 className="">What you'll learn:</h3>
        <p className="mt-3 text-base">{event?.description}</p>
        <p className="mt-2 truncate text-sm text-secondary underline">
          {event?.url}
        </p>
      </div>
    </>
  );
}

export default Details;
