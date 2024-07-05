"use server";

import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database";
import { handleApiError } from "@/lib/utils";
import User from "../database/models/user.model";
import Event from "../database/models/event.model";

export const createEvent = async ({
  event,
  userId,
  path,
}: CreateEventParams) => {
  try {
    await connectToDatabase();

    // find the organizer of this event
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    // create event
    const newEvent = await Event.create({
      ...event,
      category: event.categoryId,
      organizer: userId,
    });

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleApiError(error);
  }
};
