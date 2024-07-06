import Image from "next/image";
import image from "@/images/hero.png";
import Link from "next/link";
import ConfirmDelete from "../../../components/ConfirmDelete";
import { twMerge } from "tailwind-merge";
import { IEvent } from "@/server/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Location } from "@/constants/icons";

type CardProps = {
  event: IEvent;
  hasOrderLink: boolean;
  hidePrice: boolean;
};

function Card({ event, hasOrderLink, hidePrice }: CardProps) {
  // customize your session token
  const { userId } = auth();
  // const userId = sessionClaims?.userId as string;

  const isEventCreator = event?.organizer._id.toString() === (userId as string);

  return (
    <li className="flex-column group relative min-h-[360px] w-full gap-3 overflow-hidden rounded-xl border border-border shadow-sm transition-all hover:shadow-lg lg:min-h-[438px]">
      <Link
        href={`/events/${event._id}`}
        className="flex w-full flex-grow bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl ?? image})` }}
      />

      {/* Is Event Creator */}
      {isEventCreator && !hidePrice && (
        <div className="flex-column absolute right-2 top-2 !items-center gap-4 rounded-xl bg-background p-3 shadow-sm transition-all">
          <Link href={`/events/${event?._id}/update`}>
            <span className="icon">
              <Location size={20} />
            </span>
          </Link>

          <ConfirmDelete eventId={event?._id} />
        </div>
      )}

      <div
        className="flex w-full flex-grow bg-cover bg-center"
        style={{ backgroundImage: `url(${event.imageUrl})` }}
      >
        <div className="flex-column min-h-[230px] gap-3 px-4 py-5 md:gap-5">
          {!hidePrice && (
            <div className="row-flex-start gap-2">
              <p
                className={twMerge(
                  "badge",
                  "bg-green-500/30 px-6 text-green-700 hover:bg-green-500/50 focus:ring-green-400",
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
          )}

          <p className="my-3 ml-1 text-base font-medium leading-4 text-foreground-100">
            {formatDateTime(event?.startDateTime).dateTime}
          </p>

          <Link href={`/events/${event._id}`}>
            <h3 className="line-clamp-2 flex-1">
              {event?.title}Github Universe 2023
            </h3>
          </Link>

          <div>
            <p className="mt-auto text-sm font-medium leading-4 text-foreground-100">
              {event?.organizer.firstName} {event?.organizer.firstName}
              Adrian | JS Mastery
            </p>

            {hasOrderLink && (
              <Link
                href={`/orders?eventId=${event?._id}`}
                className="row-flex gap-2"
              >
                <p className="text-secondary">Order</p>
                <Image
                  src={image}
                  alt="search"
                  width={10}
                  height={10}
                  className=""
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

export default Card;
