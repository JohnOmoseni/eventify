import { Schema, model, models, Document } from "mongoose";

export interface ICategory {
  _id?: string;
  name: string;
}

const CategorySchema = new Schema({
  name: { type: String, unique: true, required: true },
});

const Category = models.Category || model("Category", CategorySchema);

export default Category;
