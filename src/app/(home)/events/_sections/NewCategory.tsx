import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { startTransition, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ICategory } from "@/server/database/models/category.model";
import { Close } from "@/constants/icons";
import {
  createCategory,
  getAllCategories,
} from "@/server/actions/category.action";
import InputField from "@/components/InputField";

type NewCategoryProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const NewCategory = ({ value, onChangeHandler }: NewCategoryProps) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleAddCategory = async () => {
    if (!newCategory) return;

    let category: ICategory;
    setIsLoading(true);

    try {
      category = await createCategory({ categoryName: newCategory.trim() });
      console.log("Added category: " + category);

      onChangeHandler(category?._id!);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setCategories((prev) => [...prev, category]);
      setNewCategory("");
    }
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryList: ICategory[] = await getAllCategories();

      categoryList && setCategories(categoryList);
    };

    getCategories();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
      <SelectTrigger className="w-full min-w-[180px]">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent className="relative gap-3 bg-background">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              key={category._id}
              value={category._id!}
              className="row-flex !justify-start"
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog open={openModal} onOpenChange={setOpenModal}>
          <AlertDialogTrigger className="relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm text-foreground-100 hover:bg-background-100 focus:text-foreground">
            Add new category
          </AlertDialogTrigger>
          <AlertDialogContent className="grid max-h-[360px] min-h-[200px] min-w-[300px] max-w-lg items-center overflow-y-auto rounded-lg bg-background px-4 py-4 text-foreground shadow-sm sm:px-6">
            <span
              className="icon absolute right-3 top-3 cursor-pointer text-foreground transition-colors active:scale-95"
              onClick={() => setOpenModal(false)}
              title="close"
            >
              <Close size="20" fill="#111" />
            </span>

            <AlertDialogHeader>
              <AlertDialogTitle className="text-center text-2xl capitalize">
                New Category
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-base text-gray">
                Enter a new category name.
              </AlertDialogDescription>
              <InputField
                value={newCategory}
                placeholder="Category name"
                onChange={(e) => setNewCategory(e.target.value)}
                containerClassName="mt-4"
              />
            </AlertDialogHeader>

            <AlertDialogFooter className="mt-6 flex !flex-col items-center gap-3">
              <AlertDialogCancel
                onClick={() => setOpenModal(false)}
                className="btn btn-variant w-full hover:scale-95"
              >
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                disabled={isLoading}
                onClick={() => startTransition(handleAddCategory)}
                className="btn w-full py-2 hover:scale-95"
              >
                Add Category
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default NewCategory;
