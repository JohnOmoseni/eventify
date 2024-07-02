import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  className: string;
  children: ReactNode;
};

export const StickyFooter = ({ children, className }: Props) => {
  return (
    <footer
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="relative h-[400px] max-md:h-[420px] max-[420px]:h-[450px] min-[640px]:h-[320px] md:h-[340px]"
    >
      <div
        className={twMerge(
          "fixed bottom-0 mb-3 h-[400px] w-full max-md:h-[420px] max-[420px]:h-[450px] min-[640px]:h-[310px] md:mb-6 md:h-[340px]",
          className,
        )}
      >
        {children}
      </div>
    </footer>
  );
};

const StickyVariant = ({ children, className }: Props) => {
  const parentHeight = "320px"; //to be used as height of nested divs
  return (
    <footer
      style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
      className="relative h-[320px]"
    >
      <div className="sticky-area relative -top-[100vh] h-[calc(100vh+320px)]">
        <div className="sticky top-[calc(100vh-320px)] h-[320px]">
          {children}
        </div>
      </div>
    </footer>
  );
};
