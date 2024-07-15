"use server";

import { handleApiError } from "@/utils";
import { connectToDatabase } from "../database";
import Category from "../database/models/category.model";

export const createCategory = async ({
  categoryName,
}: {
  categoryName: string;
}) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (err) {
    handleApiError(err);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const caetgrories = await Category.find();
    return JSON.parse(JSON.stringify(caetgrories));
  } catch (err) {
    handleApiError(err);
  }
};
