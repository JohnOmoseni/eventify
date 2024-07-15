"use client";

import { useRouter } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";

function BackArrow({
  onHandleGoBack,
}: {
  onHandleGoBack?: (() => void) | undefined;
}) {
  const router = useRouter();

  return (
    <div
      className="row-flex mt-6 cursor-pointer gap-1.5"
      onClick={() => (onHandleGoBack ? onHandleGoBack() : router.back())}
    >
      <IoIosArrowBack size={22} className="icon icon-bg" />
      <p className="mt-0.5 text-base capitalize transition-sm hover:underline">
        Back
      </p>
    </div>
  );
}

export default BackArrow;
