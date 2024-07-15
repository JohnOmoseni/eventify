"use client";

import { useState } from "react";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/schema";
import { InferType } from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import { EventFormProps } from "@/types";
import { FileUploader } from "./FileUploader";
import { useUploadThing } from "@/utils/uploadthing";
import { createEvent, updateEvent } from "@/server/actions/event.actions";
import { Checkbox } from "@/components/ui/checkbox";
import { Location, DollarSign, LinkIcon } from "@/constants/icons";
import { handleApiError, toastNotify } from "@/utils";
import { useToast } from "@/components/ui/use-toast";
import FormGroup from "../_sections/FormGroup";
import InputField from "@/components/InputField";
import FormWrapper from "../_sections/FormWrapper";
import DateTime from "./DateTime";
import NewCategory from "./NewCategory";

import "react-datepicker/dist/react-datepicker.css";

function EventForm({ event, eventId, userId, type }: EventFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { toast } = useToast();

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

  const onSubmit = async (
    values: InferType<typeof eventFormSchema>,
    actions: any,
  ) => {
    console.log("Creating Event", values);

    // upload image to uploadthing
    let uploadedImageUrl = values?.imageUrl;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      console.log("uploadedImages: " + uploadedImages);
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
        toastNotify(toast, "Error creating event", "Something went wrong");
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
        toastNotify(toast, "Error updating event", "Something went wrong");
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
        <NewCategory
          value={values.categoryId}
          onChangeHandler={(value) => {
            handleChange({
              target: {
                name: "categoryId",
                value: value,
              },
            });
          }}
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
