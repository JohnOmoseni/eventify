import { FormikErrors, FormikTouched } from "formik";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface FormGroupType {
  name: string;
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  children: ReactNode;
}

export default function FormGroup({
  name,
  errors,
  touched,
  children,
}: FormGroupType) {
  return (
    <div
      className={twMerge(
        "group w-full",
        errors[name] && touched[name] ? "is-error" : "",
      )}
    >
      <div
        className={twMerge(
          "rounded-md",
          errors[name] && touched[name] && "border !border-red-400",
        )}
      >
        {children}
      </div>
      <p className="mb-2 ml-[1px] mt-1 hidden text-[0.75rem] font-medium text-rose-500 animate-in group-[.is-error]:block">
        {errors[name] as string}
      </p>
    </div>
  );
}
