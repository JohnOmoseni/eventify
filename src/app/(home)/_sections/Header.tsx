"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Dispatch, SetStateAction } from "react";
import { URLS, navLinks } from "@/constants";
import { HiOutlineMenuAlt4 } from "react-icons/hi";

import logo from "@/images/logo.svg";
import NavLinks from "@/components/NavLinks";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

type HeaderProps = {
  setOpenMenu?: Dispatch<SetStateAction<boolean>>;
};

const Header = ({ setOpenMenu }: HeaderProps) => {
  return (
    <header
      className="relative w-full px-4 py-3 max-sm:shadow-sm"
      style={{ zIndex: 99 }}
    >
      <div className="row-flex-btwn mx-auto w-full gap-4">
        <Link href="/" className="group relative transition-sm hover:scale-95">
          <Image
            src={logo}
            alt="eventify"
            width={100}
            height={38}
            className="object-contain"
          />
        </Link>

        <SignedIn>
          <div className="md:row-flex hidden gap-8">
            {navLinks?.map((link, idx) => (
              <NavLinks key={idx} {...link} idx={idx} />
            ))}
          </div>
        </SignedIn>

        <div className="row-flex gap-4">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href={URLS.signin}>
              <Button
                title="Login"
                className="bg-transparent py-2 text-foreground"
              />
            </Link>
          </SignedOut>
          <div
            className="icon cursor-pointer sm:!hidden"
            onClick={() => setOpenMenu && setOpenMenu(true)}
          >
            <HiOutlineMenuAlt4 size={22} className="" color="#333" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
