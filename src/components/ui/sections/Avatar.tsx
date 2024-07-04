import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { twMerge } from "tailwind-merge";

type AvatarProps = {
  src?: string;
  fallback?: string;
  containerClassName?: string;
};

function AvatarWrapper({ src, fallback, containerClassName }: AvatarProps) {
  return (
    <Avatar
      className={twMerge(
        "grid bg-background-200 transition-colors transition-sm hover:scale-95",
        containerClassName,
      )}
    >
      <AvatarImage src={src ?? "https://github.com/shadcn.png"} />
      <AvatarFallback>{fallback ?? "JO"}</AvatarFallback>
    </Avatar>
  );
}

export default AvatarWrapper;
