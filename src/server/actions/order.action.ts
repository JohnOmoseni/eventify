"use server";

import {
  CheckoutOrderParams,
  CheckOutOrderParamsFlw,
  CreateOrderParams,
  CreateOrderParamsFlw,
  GetOrdersByEventParams,
  GetOrdersByUserParams,
} from "@/types/actionTypes";
import { redirect } from "next/navigation";
import { connectToDatabase } from "../database";
import { ObjectId } from "mongodb";
import { v4 as uuid } from "uuid";

import User from "../database/models/user.model";
import Order from "../database/models/order.model";
import Event from "../database/models/event.model";
import Stripe from "stripe";
import axios from "axios";
import { handleApiError } from "@/utils";

export const checkoutOrderFlw = async (order: CheckOutOrderParamsFlw) => {
  const price = order.isFree ? 0 : Number(order.price);

  try {
    const response = await axios.post(
      "https://api.flutterwave.com/v3/payments",
      {
        tx_ref: uuid(),
        amount: price,
        currency: "NGN",
        payment_options: "card,mobilemoney,ussd",
        redirect_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        customer: {
          email: order.user?.email,
          name: order.user?.username,
          phone_number: order.user?.phoneNumber,
        },
        meta: { eventId: order.eventId, buyerId: order.buyerId },
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

    console.log(response.data);

    if (response.data?.status === "success") {
      redirect(response.data?.data?.link);
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

    const newOrder = await Order.create({
      ...order,
      event: order.eventId,
      buyer: order.buyerId,
    });

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleApiError(error);
  }
};

export const checkoutOrder = async (order: CheckoutOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  // stripe takes in the price in cents
  const price = order.isFree ? 0 : Number(order.price) * 100;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: order.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: order.eventId,
        buyerId: order.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });

    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createOrder = async (order: CreateOrderParams) => {
  try {
    await connectToDatabase();

    const newOrder = await Order.create({
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
