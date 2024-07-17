"use server";

import { MetaDataParams } from "@/types/actionTypes";
import { connectToDatabase } from "../database";
import { v4 as uuid } from "uuid";
import MetaData from "../database/models/metadata.model";
import { handleApiError } from "@/utils";

export async function createMetadata(metadata: MetaDataParams) {
  await connectToDatabase();

  if (!metadata) throw new Error("Metadata is required");

  try {
    const tx_reference = uuid();
    await MetaData.create({ tx_reference, ...metadata });

    console.log(tx_reference);

    return JSON.parse(JSON.stringify({ tx_reference }));
  } catch (error) {
    handleApiError(error, "Failed to store metadata");
  }
}
