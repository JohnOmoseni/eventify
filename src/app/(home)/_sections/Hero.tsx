import Image from "next/image";
import Link from "next/link";
import hero from "@/images/hero.png";
import { URLS } from "@/constants";
import { Button } from "@/components/Button";
import TextGenerateEffect from "@/components/anims/TextGenerateEffect";

function Hero() {
  return (
    <div className="hero flex-column md:row-flex bg- relative min-h-dvh w-full !items-center gap-8 pb-8 pt-12 md:pt-0 lg:mt-[-3%]">
      <div className="flex-1 px-3.5 md:pl-[max(2em,_6%)]">
        <h1 className="relative isolate max-md:text-center lg:whitespace-nowrap">
          Host, Connect,
          <br /> Celebrate: Your Events,
          <br />
          Our Platform!
        </h1>

        <TextGenerateEffect
          className="mt-8 max-w-[50ch] text-lg font-light max-md:mx-auto max-md:px-3 max-md:text-center"
          words="Book and learn helpful tips from 3,168+ mentors in world-class companies with our global community."
        />

        <Link href={URLS.signup}>
          <Button
            title="Explore now"
            className="px-10 py-3.5 text-lg max-sm:mx-auto"
          />
        </Link>
      </div>

      <div className="row-flex relative -z-10 mx-4 h-[400px] min-h-[340px] w-full min-w-[300px] md:min-w-[360px] lg:h-[600px]">
        <Image
          src={hero}
          alt="hero"
          width={1000}
          height={1000}
          // fill
          className="!object-contain"
        />
      </div>
    </div>
  );
}

export default Hero;
