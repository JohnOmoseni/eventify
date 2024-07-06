"use client";

import { Button } from "@/components/Button";
import logo from "@/images/logo.svg";

import Image from "next/image";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error?: Error;
  reset: () => void;
}) {
  return (
    <div className="fixed left-0 top-0 grid min-h-dvh w-full place-items-center">
      <div className="group absolute left-3 top-3 transition-sm hover:scale-95 sm:left-6 sm:top-5">
        <Image
          src={logo}
          alt="eventify"
          width={100}
          height={30}
          className="object-contain"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-10 px-3">
        <h2 className="line-clamp-5 max-w-[45ch] text-center text-2xl sm:text-3xl">
          Error | {error?.message ?? "Something went wrong"}.
        </h2>
        <Button
          title="Try again"
          onClick={() => reset()}
          className="px-10 py-3.5 text-lg"
        />
      </div>
    </div>
  );
}
