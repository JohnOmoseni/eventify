import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { IEvent } from "@/server/database/models/event.model";
import { auth } from "@clerk/nextjs/server";
import { ArrowUp, Edit } from "@/constants/icons";
import { formatDateTime } from "@/utils";
import ConfirmDelete from "@/components/ConfirmDelete";

type CardProps = {
  event: IEvent;
  hasOrderLink: boolean;
  hidePrice: boolean;
};

function Card({ event, hasOrderLink, hidePrice }: CardProps) {
  // customize your session token
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = event?.organizer._id.toString() === (userId as string);

  return (
    <li className="flex-column group relative min-h-[400px] w-full overflow-hidden rounded-xl border border-t-0 border-border-100 shadow-sm transition-sm hover:shadow-md max-sm:min-w-[300px] lg:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        className="flex min-h-[230px] w-full flex-grow bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      />

      {/* Is Event Creator */}
      {isEventCreator && !hidePrice && (
        <div className="flex-column absolute right-2 top-2 !items-center gap-4 rounded-xl bg-background p-2 shadow-sm transition-sm">
          <Link href={`/events/${event?._id}/update`}>
            <span className="icon">
              <Edit size={20} />
            </span>
          </Link>

          <ConfirmDelete eventId={event?._id} />
        </div>
      )}

      <div className="flex-column h-full w-full gap-2 px-3 py-5 pb-4">
        <div className="row-flex-btwn w-full gap-3">
          {!hidePrice && (
            <div className="row-flex-start gap-2">
              <p
                className={twMerge(
                  "badge",
                  "bg-green-500/30 px-6 text-green-700 hover:bg-green-500/50 focus:ring-green-400",
                )}
              >
                {event?.isFree ? "FREE" : `$${event?.price}`}
              </p>
              <p
                className={twMerge(
                  "badge",
                  "line-clamp-1 truncate bg-neutral-500/20 px-6 text-neutral-500 hover:bg-neutral-500/50 focus:ring-neutral-400",
                )}
              >
                {event?.category?.name}
              </p>
            </div>
          )}

          <p className="text-end text-sm font-medium leading-4 text-foreground-100">
            {formatDateTime(event?.startDateTime).dateTime}
          </p>
        </div>

        <Link href={`/events/${event._id}`} className="my-4 inline-flex">
          <h3 className="line-clamp-2">{event?.title}</h3>
        </Link>

        <div className="row-flex-btwn mt-auto w-full gap-4">
          <p className="text-base font-medium leading-4 text-foreground-100">
            {event?.organizer?.firstName} {event?.organizer?.lastName}
          </p>

          {hasOrderLink && (
            <Link
              href={`/orders?eventId=${event?._id}`}
              className="row-flex gap-2"
            >
              <p className="text-base text-secondary">Order</p>
              <span className="icon">
                <ArrowUp size={20} />
              </span>
            </Link>
          )}
        </div>
      </div>
    </li>
  );
}

export default Card;
