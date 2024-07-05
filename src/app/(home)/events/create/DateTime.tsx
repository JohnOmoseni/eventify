import { Calendar } from "@/constants/icons";
import { eventFormSchema } from "@/schema";
import React, { FocusEventHandler } from "react";
import DatePicker from "react-datepicker";
import { InferType } from "yup";

type DateTimeProps = {
  label?: string;
  name: string;
  values: InferType<typeof eventFormSchema>;
  selected: any;
  handleChange: any;
  handleBlur?: FocusEventHandler<HTMLInputElement>;
};

function DateTime({
  values,
  handleBlur,
  handleChange,
  label,
  name,
  selected,
}: DateTimeProps) {
  return (
    <div className="row-flex relative h-10 w-full !justify-start gap-1 rounded-md border border-input shadow-sm">
      <span className="icon pl-2">
        <Calendar size={20} className="" />
      </span>

      <p className="pl-2 text-sm">{label ?? "Start Date"}:</p>

      <DatePicker
        id={name}
        // selected={values[name as keyof typeof eventFormSchema]}
        selected={selected}
        onBlur={handleBlur}
        onChange={(date) => {
          handleChange({
            target: {
              name: name,
              value: date,
            },
          });
        }}
        showTimeSelect
        timeInputLabel="Time:"
        dateFormat={"MM/dd/yyyy hh:mm aa"}
        wrapperClassName="date-picker text-sm"
      />
    </div>
  );
}

export default DateTime;
