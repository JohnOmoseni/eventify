import { Schema, model, models, Document } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  location: String,
  imageUrl: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
  startDateTime: { type: Date, default: Date.now() },
  endDateTime: { type: Date, default: Date.now() },
  price: String,
  isFree: { type: Boolean, default: false },
  url: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  organizer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Event = models.Event || model("Event", EventSchema);

export default Event;

export interface IEvent extends Document {
  _id: string;
  title: string;
  description?: string;
  location?: string;
  createdAt: Date;
  imageUrl: string;
  startDateTime: Date;
  endDateTime: Date;
  price: string;
  isFree: boolean;
  url?: string;
  category: { _id: string; name: string };
  organizer: { _id: string; firstName: string; lastName: string };
}
