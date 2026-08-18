import Image from "next/image";
import { cn } from "@/lib/utils";

type WordmarkProps = {
  className?: string;
};

export function Wordmark({ className = "" }: WordmarkProps) {
  return (
    <Image
      src="/images/back2mboa_logo_section_7_etape-680.webp"
      alt="Back2Mboa"
      width={910}
      height={326}
      className={cn("h-12 w-auto object-contain md:h-[7.5rem]", className)}
    />
  );
}
