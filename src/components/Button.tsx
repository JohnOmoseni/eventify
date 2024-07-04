"use client";

import { IconType } from "react-icons/lib";
import { twMerge } from "tailwind-merge";

type BtnProps = {
  title: string;
  className?: string;
  type?: "button" | "submit" | "reset";
  dir?: "left" | "right";
  icon?: IconType;
  disabled?: boolean;
  onClick?: () => void;
};

export const Button = ({
  title,
  className,
  type,
  icon: Icon,
  onClick,
  disabled,
  dir = "left",
}: BtnProps) => {
  return (
    <button
      type={type || "button"}
      disabled={disabled}
      onClick={onClick}
      className={twMerge(
        "btn row-flex hover:bg-secondary/90 relative min-w-max cursor-pointer overflow-hidden rounded-full bg-secondary px-7 py-2.5 text-base font-medium capitalize leading-6 text-background transition-colors transition-sm hover:scale-105 focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1 active:scale-95 disabled:pointer-events-none disabled:opacity-50",
        Icon && "gap-2",
        className,
      )}
    >
      {dir === "left" && Icon && (
        <Icon size={20} className="mt-0.5 font-semibold" />
      )}
      {title}
      {dir === "right" && Icon && (
        <Icon size={20} className="mt-0.5 font-semibold" />
      )}
    </button>
  );
};
