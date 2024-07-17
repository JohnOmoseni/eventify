"use server";

import {
  CheckOutOrderParamsFlw,
  CreateOrderParamsFlw,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types/actionTypes";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../database";
import { handleApiError } from "@/utils";
import { ObjectId } from "mongodb";

import User from "../database/models/user.model";
import Order, { IOrder } from "../database/models/order.model";
import Event from "../database/models/event.model";
import axios from "axios";

export const checkoutOrderFlw = async (order: CheckOutOrderParamsFlw) => {
  const price = order.isFree ? 0 : Number(order.price);

  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: order?.tx_reference,
        amount: price,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        redirect_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        customer: {
          email: order.user?.email,
          name: order.user?.username,
          phone_number: order.user?.phoneNumber,
        },
        customizations: {
          title: order.eventTitle,
          description: order.eventDesc,
          logo: order.eventLogo,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (response.data?.status === "success") {
      redirect(response.data.data?.link);
    } else {
      redirect(`${process.env.NEXT_PUBLIC_SERVER_URL}/`);
    }
  } catch (err) {
    handleApiError(err);
  }
};

export const createOrderFlw = async (order: CreateOrderParamsFlw) => {
  try {
    await connectToDatabase();

    const newOrder: IOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleApiError(error);
  }
};

// GET ORDERS BY EVENT
export async function getOrdersByEvent({
  searchString,
  eventId,
}: GetOrdersByEventParams) {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error("Event ID is required");
    const eventObjectId = new ObjectId(eventId);

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(orders));
  } catch (error) {
    handleApiError(error);
  }
}

// GET ORDERS BY USER
export async function getOrdersByUser({
  userId,
  limit = 3,
  page,
}: GetOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const orders = await Order.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount =
      await Order.distinct("event._id").countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(orders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleApiError(error);
  }
}

// GET ONE ORDER BY ID
export async function getOrderById(orderId: string, userId: string) {
  try {
    await connectToDatabase();

    // find the organizer of this event
    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const order = await Order.findById(orderId).populate({
      path: "event",
      model: Event,
      select: "_id title imageUrl organizer",
      populate: {
        path: "organizer",
        model: User,
        select: "_id firstName lastName",
      },
    });

    console.log("Order", order);

    if (!order) throw new Error("Order not found");

    return JSON.parse(JSON.stringify(order));
  } catch (error) {
    handleApiError(error);
  }
}
