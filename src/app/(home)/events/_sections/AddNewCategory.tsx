"use client";

import { Button } from "@/components/Button";
import { createCategory } from "@/server/actions/category.action";
import { ICategory } from "@/server/database/models/category.model";
import { Dispatch, SetStateAction, startTransition, useState } from "react";
import InputField from "@/components/InputField";

const AddNewCategory = ({
  newCategory,
  setNewCategory,
  setOpenModal,
  setCategories,
}: {
  newCategory: string;
  setNewCategory: Dispatch<SetStateAction<string>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setCategories: Dispatch<SetStateAction<ICategory[]>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCatergory = async () => {
    let category: ICategory;
    setIsLoading(true);

    try {
      category = await createCategory({ categoryName: newCategory.trim() });
      console.log("Adding category: " + category);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);

      setCategories((prev) => [...prev, category]);
      setNewCategory("");
      setOpenModal(false);
      console.log("added new category:", newCategory);
    }
  };
  return (
    <>
      <InputField
        value={newCategory}
        placeholder="Category name"
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <div className="mt-6 flex flex-col items-center gap-3">
        <Button
          title="Cancel"
          onClick={() => setOpenModal(false)}
          className="btn-variant w-full"
        />
        <Button
          title="Add Category"
          disabled={isLoading}
          onClick={() => startTransition(handleAddCatergory)}
          className="w-full py-2"
        />
      </div>
    </>
  );
};

export default AddNewCategory;
