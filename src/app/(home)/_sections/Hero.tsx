import Image from "next/image";
import Link from "next/link";
import hero from "@/images/hero.png";
import { URLS } from "@/constants";
import { Button } from "@/components/Button";
import TextGenerateEffect from "@/components/anims/TextGenerateEffect";

function Hero() {
  return (
    <div className="hero relative isolate grid min-h-dvh grid-cols-1 items-center gap-16 pb-6 pt-10 md:grid-cols-2 md:gap-4 md:pt-0 lg:mt-[-3%]">
      <div className="flex-1 max-md:px-3 md:pl-[min(4em,_10%)] md:pt-[6%]">
        <h1 className="relative max-md:text-center">
          Host, Connect, <br /> Celebrate: Your Events, <br /> Our Platform!
        </h1>

        <TextGenerateEffect
          className="mt-6 max-w-[50ch] text-lg font-light max-md:mx-auto max-md:px-3 max-md:text-center"
          words="Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community."
        />

        <Link
          href={URLS.createEvent}
          className="row-flex mt-12 md:mt-16 md:!justify-start"
        >
          <Button title="Explore now" className="px-10 py-3.5 text-lg" />
        </Link>
      </div>

      <div className="row-flex relative -z-10 md:-mt-[10%] lg:mt-[3%]">
        <Image
          src={hero}
          alt="hero"
          width={1000}
          height={1000}
          className="max-h-[80vh] object-contain object-center max-[400px]:max-h-[65vh] 2xl:max-h-[70vh]"
        />
      </div>
    </div>
  );
}

export default Hero;
