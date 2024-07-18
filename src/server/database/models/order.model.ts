import { Schema, model, models, Document } from "mongoose";

const OrderSchema = new Schema({
  createdAt: {
    type: Date,
    default: Date.now,
  },
  txnId: { type: String, required: true, unique: true },
  flwId: {
    type: String,
    required: true,
    unique: true,
  },
  totalAmount: String,
  paymentType: String,
  status: String,
  event: {
    type: Schema.Types.ObjectId,
    ref: "Event",
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

const Order = models.Order || model("Order", OrderSchema);

export default Order;

export interface IOrder extends Document {
  createdAt: Date;
  txnId: string;
  flwId: string;
  totalAmount: string;
  status: string;
  paymentType?: string;
  event: {
    _id: string;
    title: string;
  };
  buyer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
}

export type IOrderItem = {
  _id: string;
  totalAmount: string;
  createdAt: Date;
  eventTitle: string;
  eventId: string;
  buyer: string;
};
