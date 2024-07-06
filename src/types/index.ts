import { IEvent } from "@/server/database/models/event.model";

// ====== ROOT PARAMS
export type NavLinkProps = {
  name: string;
  tag: string;
  href: string;
  idx?: number;
  menu?: boolean;
  handleClick?: () => void;
};

export type EventFormProps = {
  type: "Create" | "Update";
  userId: string;
  event?: IEvent;
  eventId?: string;
};
