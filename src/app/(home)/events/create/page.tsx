"use client";

import { useState } from "react";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/schema";
import { handleApiError } from "@/lib/utils";
import { InferType } from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import FormGroup from "../_sections/FormGroup";
import InputField from "@/components/InputField";
import FormWrapper from "../_sections/FormWrapper";
import Modal from "@/components/ui/sections/Modal";
import SelectDropdown from "@/components/ui/sections/Select";

function CreateEvent() {
  const router = useRouter();
  let [openModal, setOpenModal] = useState(false);

  const onSubmit = async (values: InferType<typeof eventFormSchema>) => {
    console.log("Creating Event", values);

    try {
    } catch (error) {
      handleApiError(error);
    } finally {
      // actions.resetForm();
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
    initialValues: eventDefaultValues,
    validationSchema: eventFormSchema,
    onSubmit,
  });

  return (
    <div className="px-3 pb-4 pt-6 sm:px-6">
      <FormWrapper
        title="Create Event"
        buttonLabel="Create Event"
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <FormGroup name="title" errors={errors} touched={touched}>
          <InputField
            value={values.title}
            placeholder="Event Title"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup name="title" errors={errors} touched={touched}>
          <SelectDropdown
            value={values.categoryId}
            items={["hello", "world", "test"]}
            setValue={handleChange}
            placeholder="Choose Category"
            otherContent={() => (
              <Modal
                trigger={<span className="w-full">Add new Category</span>}
                openModal={openModal}
                setOpenModal={setOpenModal}
              />
            )}
          />
        </FormGroup>

        <Modal
          trigger={<span className="w-full">Add new Category</span>}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />

        <FormGroup name="description" errors={errors} touched={touched}>
          <InputField
            value={values.description}
            placeholder="Description"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup name="location" errors={errors} touched={touched}>
          <InputField
            value={values.location}
            placeholder="Location"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup name="price" errors={errors} touched={touched}>
          <InputField
            value={values.price}
            placeholder="Price"
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </FormGroup>
      </FormWrapper>
    </div>
  );
}

export default CreateEvent;
