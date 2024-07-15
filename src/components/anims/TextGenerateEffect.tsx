"use client";

import { useEffect, useRef } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/utils";

const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");
  const elemRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(elemRef);

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      },
    );
  }, [scope.current, inView]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              ref={elemRef}
              key={word + idx}
              className="text-foreground opacity-0"
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div
      className={cn(
        "text-2xl font-normal leading-snug tracking-wide text-foreground",
        className,
      )}
    >
      {renderWords()}
    </div>
  );
};

export default TextGenerateEffect;
