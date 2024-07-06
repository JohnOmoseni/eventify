import Card from "./Card";
import { IEvent } from "@/server/database/models/event.model";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptySubText: string;
  collectionType?: "Events_Organized" | "My_Events" | "All_Events";
  limit: number;
  page?: number | string;
  urlParamName?: string;
  totalPages?: number;
};

function Collection({
  data: events,
  emptyTitle,
  emptySubText,
  collectionType,
  limit,
  page,
  totalPages,
}: CollectionProps) {
  return (
    <div className="flex-column gap-10">
      {events?.length > 0 ? (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-10 lg:grid-cols-3">
          {events.map((event, idx) => {
            const hidePrice = collectionType === "My_Events";
            const hasOrderLink = collectionType === "Events_Organized";

            return (
              <Card
                event={event}
                key={idx}
                hidePrice={hidePrice}
                hasOrderLink={hasOrderLink}
              />
            );
          })}
        </ul>
      ) : (
        <div className="flex-column min-h-[200px] gap-3 py-28 text-center">
          <h3 className="font-bold">{emptyTitle}</h3>
          <p className="text-sm">{emptySubText}</p>
        </div>
      )}
    </div>
  );
}

export default Collection;