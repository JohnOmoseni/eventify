"use client";

import { useEffect, useState } from "react";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/schema";
import { handleApiError } from "@/lib/utils";
import { InferType } from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { useQuery } from "@tanstack/react-query";
import { ICategory } from "@/server/database/models/category.model";
import { EventFormProps } from "@/types";
import { FileUploader } from "./FileUploader";
import { getAllCategories } from "@/server/actions/category.action";
import { useUploadThing } from "@/utils/uploadthing";
import { createEvent, updateEvent } from "@/server/actions/event.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Location, DollarSign, LinkIcon } from "@/constants/icons";
import FormGroup from "../_sections/FormGroup";
import InputField from "@/components/InputField";
import FormWrapper from "../_sections/FormWrapper";
import Modal from "@/components/ui/sections/Modal";
import SelectDropdown from "@/components/ui/sections/Select";
import AddNewCategory from "./AddNewCategory";
import DateTime from "./DateTime";

import "react-datepicker/dist/react-datepicker.css";

async function EventForm({ event, eventId, userId, type }: EventFormProps) {
  const [openModal, setOpenModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([
    { name: "hello" },
    { name: "world" },
  ]);
  const initialValues =
    event && type === "Update"
      ? {
          ...event,
          categoryId: event.category._id,
          startDateTime: new Date(event.startDateTime),
          endDateTime: new Date(event.endDateTime),
        }
      : eventDefaultValues;

  const router = useRouter();
  const { startUpload } = useUploadThing("imageUploader");

  const { data: categoryList, isLoading: fetchingCategoryList } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getAllCategories(),
  });

  useEffect(() => {
    if (categoryList) setCategories(categoryList as ICategory[]);
  }, [categoryList]);

  const onSubmit = async (
    values: InferType<typeof eventFormSchema>,
    actions: any,
  ) => {
    console.log("Creating Event", values);

    // upload image to uploadthing
    let uploadedImageUrl = values?.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);
      if (!uploadedImages) return;

      uploadedImageUrl = uploadedImages[0].url;
    }

    if (type === "Create") {
      // create an event
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          actions.resetForm();

          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        handleApiError(error);
      }
    }

    if (type === "Update") {
      // update an event
      if (!eventId) router.back();

      try {
        const updatedEvent = await updateEvent({
          event: {
            ...values,
            imageUrl: uploadedImageUrl,
            _id: eventId!,
          },
          userId,
          path: `/events/${eventId}`,
        });

        if (updatedEvent) {
          actions.resetForm();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        handleApiError(error);
      }
    }
  };
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues,
    validationSchema: eventFormSchema,
    onSubmit,
  });

  return (
    <FormWrapper
      title={type === "Update" ? "Update Event" : "Create Event"}
      buttonLabel={type === "Update" ? "Update Event" : "Create Event"}
      onSubmit={handleSubmit}
      isSubmitting={isSubmitting}
    >
      <FormGroup name="title" errors={errors} touched={touched}>
        <InputField
          value={values.title}
          id="title"
          placeholder="Event Title"
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>

      <FormGroup name="categoryId" errors={errors} touched={touched}>
        <SelectDropdown
          value={values.categoryId}
          items={categories}
          isFetchingList={fetchingCategoryList}
          setValue={(value) => {
            handleChange({
              target: {
                name: "categoryId",
                value: value,
              },
            });
          }}
          placeholder="Choose Category"
          otherContent={() => (
            <Modal
              title="New Category"
              trigger={
                <span className="relative flex cursor-pointer select-none items-center py-1.5 text-sm focus:text-foreground">
                  Add new Category
                </span>
              }
              openModal={openModal}
              setOpenModal={setOpenModal}
              dialogContent={
                <AddNewCategory
                  newCategory={newCategory}
                  setNewCategory={setNewCategory}
                  setOpenModal={setOpenModal}
                  setCategories={setCategories}
                />
              }
            />
          )}
        />
      </FormGroup>

      <FormGroup name="description" errors={errors} touched={touched}>
        <Textarea
          value={values.description}
          id="description"
          placeholder="Description"
          onBlur={handleBlur}
          onChange={handleChange}
          className="min-h-[120px] resize-none"
        />
      </FormGroup>

      <FormGroup name="imageUrl" errors={errors} touched={touched}>
        <FileUploader
          imageUrl={values.imageUrl}
          setFiles={setFiles}
          onFieldChange={(url) => {
            handleChange({
              target: {
                name: "imageUrl",
                value: url,
              },
            });
          }}
        />
      </FormGroup>

      <FormGroup name="location" errors={errors} touched={touched}>
        <InputField
          value={values.location}
          id="location"
          placeholder="Location"
          onBlur={handleBlur}
          icon={Location}
          onChange={handleChange}
        />
      </FormGroup>

      {/* datepicker */}
      <DateTime
        name="startDateTime"
        label="Start Date"
        selected={values.startDateTime}
        values={values}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      <DateTime
        name="endDateTime"
        label="End Date"
        selected={values.endDateTime}
        values={values}
        handleChange={handleChange}
        handleBlur={handleBlur}
      />

      {/* price field */}
      <FormGroup name="price" errors={errors} touched={touched}>
        <InputField
          value={values.price}
          id="price"
          placeholder="Price"
          icon={DollarSign}
          onBlur={handleBlur}
          onChange={handleChange}
          render={() => (
            <div className="row-flex gap-2">
              <label
                htmlFor="isFree"
                className="whitespace-nowrap text-sm peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Free Ticket
              </label>

              <Checkbox
                id="isFree"
                name="isFree"
                onCheckedChange={() => {
                  handleChange({
                    target: {
                      name: "isFree",
                      value: !values.isFree,
                    },
                  });
                }}
                checked={values.isFree}
                type="button"
                className="h-5 w-5 border-2 border-input"
              />
            </div>
          )}
        />
      </FormGroup>

      {/* url field */}
      <FormGroup name="url" errors={errors} touched={touched}>
        <InputField
          value={values.url}
          id="url"
          placeholder="URL"
          icon={LinkIcon}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      </FormGroup>
    </FormWrapper>
  );
}

export default EventForm;
