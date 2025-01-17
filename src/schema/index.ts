import * as yup from "yup";

export const eventFormSchema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Title must be at least 3 characters")
    .required("Field is required")
    .trim(),
  description: yup
    .string()
    .max(400, "Description must be less than 400 characters"),
  location: yup.string().max(400, "Location must be less than 400 characters"),
  imageUrl: yup.string().required("Field is required"),
  startDateTime: yup.date().default(() => new Date()),
  endDateTime: yup.date().default(() => new Date()),
  categoryId: yup.string().default(""),
  price: yup.string().default(""),
  isFree: yup.boolean().default(false),
  url: yup.string().url("Must be a valid URL").default(""),
});
