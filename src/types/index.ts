import { IEvent } from "@/server/database/models/event.model";

// ====== ROOT PARAMS
export type NavLinkProps = {
  name: string;
  href: string;
  idx?: number;
  menu?: boolean;
  setOpenMenu: () => void;
};

export type EventFormProps = {
  type: "Create" | "Update";
  userId: string;
  event?: IEvent;
  eventId?: string;
};
