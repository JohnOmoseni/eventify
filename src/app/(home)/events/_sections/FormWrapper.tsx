import { ReactNode } from "react";
import { Button } from "@/components/Button";
import BackArrow from "@/components/BackArrow";

interface FormWrapperProps {
  children: ReactNode;
  title: string;
  buttonLabel: string;
  isSubmitting?: boolean;
  onSubmit?: () => void;
}

function FormWrapper({
  children,
  title,
  buttonLabel,
  isSubmitting,
  onSubmit,
}: FormWrapperProps) {
  return (
    <div className="w-full">
      <div className="max-w-max">
        <BackArrow />
      </div>

      <div className="mx-auto mt-6 w-full max-w-[600px]">
        <h3 className="text-center text-xl">{title}</h3>

        <div className="mb-4 mt-6 rounded-xl px-4 py-6 shadow-md sm:mt-10 sm:px-6">
          <form onSubmit={onSubmit} className="flex-column gap-4">
            {children}

            <Button
              type="submit"
              title={isSubmitting ? "Submitting..." : buttonLabel}
              className="mx-auto mt-8 px-12"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default FormWrapper;
