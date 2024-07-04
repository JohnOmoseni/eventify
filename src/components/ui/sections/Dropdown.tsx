import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import clsx from "clsx";
import { Fragment, ReactNode } from "react";

interface DropdownProps {
  list?: any[];
  trigger?: ReactNode;
}

const links = [
  { href: "/settings", label: "Settings" },
  { href: "/support", label: "Support" },
  { href: "/license", label: "License" },
  { href: "/license", label: "License" },
  { href: "/license", label: "License" },
  { href: "/license", label: "License" },
  { href: "/license", label: "License" },
  { href: "/license", label: "License" },
  { href: "/license", label: "License" },
];

export default function Dropdown({ list, trigger }: DropdownProps) {
  return (
    <Menu>
      <MenuButton as={Fragment}>
        {({ active }) => (
          <button className={clsx(active && "text-secondary", "relative")}>
            {trigger}
          </button>
        )}
      </MenuButton>
      <MenuItems
        anchor="bottom"
        className="left-0 z-[99] !max-h-[20rem] !max-w-[20rem] overflow-y-auto rounded-md border border-input bg-background shadow-sm max-sm:!max-w-[18rem]"
      >
        {links && links.length > 0 ? (
          links.map((link) => (
            <MenuItem key={link.href} as={Fragment}>
              {({ focus }) => (
                <li
                  className={clsx(
                    "row-flex gap-2.5 border-b border-input py-2 pl-2.5 pr-3.5 transition-sm",
                    focus && "bg-orange-300 font-semibold text-background",
                  )}
                >
                  <span
                    className={clsx(
                      "relative flex h-8 w-8 shrink-0 overflow-hidden rounded-full bg-background-200 p-1 transition-colors",
                      focus && "",
                    )}
                  ></span>
                  <span
                    className={clsx(
                      "w-full break-words transition-colors",
                      focus && "font-semibold text-background",
                    )}
                  >
                    Airtime purchase of ₦1,000 successful
                  </span>
                  <span
                    className={clsx(
                      "text-sm transition-colors",
                      focus && "font-semibold text-background",
                    )}
                  >
                    Nov 20, 2023 8:55 AM
                  </span>
                </li>
              )}
            </MenuItem>
          ))
        ) : (
          <MenuItem as={Fragment}>
            <p className="">No item</p>
          </MenuItem>
        )}
      </MenuItems>
    </Menu>
  );
}
