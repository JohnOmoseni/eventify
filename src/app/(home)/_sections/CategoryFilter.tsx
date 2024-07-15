"use client";

import SelectDropdown from "@/components/ui/sections/Select";
import { SelectItem } from "@/components/ui/select";

import React, { useEffect, useState } from "react";
import { getAllCategories } from "@/server/actions/category.action";
import { ICategory } from "@/server/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";

function CategoryFilter() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const getCategories = async () => {
      const categoryList = await getAllCategories();

      categoryList && setCategories(categoryList);
    };

    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <SelectDropdown
      items={categories}
      setValue={onSelectCategory}
      placeholder="Category"
      itemContainerStyle=""
      otherItem={() => (
        <SelectItem value="All" className="">
          All
        </SelectItem>
      )}
    />
  );
}

export default CategoryFilter;
