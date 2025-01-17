import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-4 pb-4 pt-10 mt-auto">
      <div className="sm:row-flex-btwn flex flex-col justify-between gap-4">
        <div className="flex-column w-full gap-3 max-sm:mx-auto max-sm:!items-center">
          <Link href="/" className="block">
            <Image
              src="/images/logo.svg"
              alt="eventify"
              width={100}
              height={30}
              className="object-contain"
            />
          </Link>
          <p className="max-w-[30ch] leading-5 max-sm:text-center max-sm:text-sm">
            Your Trusted Partner in Hassle-Free Bill Payments!
          </p>
        </div>
        <p className="whitespace-nowrap text-center max-sm:text-sm sm:self-end">
          2024 Evently. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
