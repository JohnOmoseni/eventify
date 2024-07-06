import { animateFn, linksAni } from "@/lib/animate";
import { NavLinkProps } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

function NavLinks({ name, tag, href, menu, idx, handleClick }: NavLinkProps) {
  const navlink = "relative p-1 text-base tracking-snug whitespace-nowrap ";
  const menulink = "";

  const pathname = usePathname();
  const isActive = pathname === href;

  const onClick = (tag: string) => {
    handleClick && handleClick();
    const element = document.getElementById(tag);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <WrapperComponent
      menu={menu}
      href={href}
      {...(menu && animateFn(linksAni, idx))}
      onClick={() => onClick(tag)}
    >
      <motion.span
        className={twMerge(
          "cursor-pointer capitalize transition-colors transition-sm hover:font-medium hover:text-secondary",
          menu ? menulink : navlink,
          isActive && "font-semibold text-secondary",
        )}
      >
        {name}
      </motion.span>
    </WrapperComponent>
  );
}

export default NavLinks;

const WrapperComponent = ({
  menu,
  href,
  children,
  onClick,
  ...rest
}: {
  menu?: boolean;
  href: string;
  children: ReactNode;
  onClick: () => void;
  [key: string]: any;
}) => {
  return menu ? (
    <motion.p onClick={onClick} {...rest}>
      {children}
    </motion.p>
  ) : (
    <Link href={href} {...rest}>
      {children}
    </Link>
  );
};
