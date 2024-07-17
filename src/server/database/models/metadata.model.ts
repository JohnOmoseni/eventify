import { Schema, model, models, Document } from "mongoose";

export interface IMetadata extends Document {
  tx_reference: string;
  eventId: string;
  buyerId: string;
}

const MetaDataSchema = new Schema({
  tx_reference: { type: String, required: true, unique: true },
  eventId: { type: String, required: true },
  buyerId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now() },
});

const MetaData = models.MetaData || model("MetaData", MetaDataSchema);

export default MetaData;
