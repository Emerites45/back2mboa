import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Step } from "@/types/step";

const SIZES = "(min-width: 1024px) 190px, (min-width: 360px) 248px, 70vw";

type StepCardProps = {
  step: Step;
  className?: string;
};

export function StepCard({ step, className }: StepCardProps) {
  const src = `/images/${step.slug}-470.webp`;
  const isFirst = step.n === 1;

  return (
    <article
      className={cn(
        "group relative flex aspect-[3/5] w-full flex-col overflow-hidden rounded-2xl",
        "lg:transition-transform lg:duration-200 lg:ease-out lg:hover:-translate-y-1",
        className,
      )}
    >
      <div className="absolute inset-0" style={{ backgroundColor: step.tone }}>
        <Image
          src={src}
          alt=""
          fill
          sizes={SIZES}
          className="object-cover"
          priority={isFirst}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-black/45 to-transparent"
        aria-hidden="true"
      />

      <div className="relative z-10 flex items-start justify-between gap-1.5 px-3 pt-3">
        <h3 className="text-[0.875rem] font-bold leading-tight text-white sm:text-[0.9375rem]">
          {step.title}
        </h3>
        <span
          className="grid size-6 shrink-0 place-items-center rounded-full bg-white/25 text-[0.7rem] font-medium tabular-nums text-white"
          aria-hidden="true"
        >
          {step.n}
        </span>
      </div>

      <div className="relative z-10 mt-auto overflow-hidden">
        <Image
          src={src}
          alt=""
          fill
          sizes={SIZES}
          aria-hidden="true"
          className="object-cover object-bottom blur-2xl scale-125"
        />
        <div className="absolute inset-0 bg-[var(--card-glass)] backdrop-blur-xl transition-colors duration-200 lg:group-hover:bg-black/40" />
        <p className="relative px-2.5 py-3.5 text-center text-[0.8rem] leading-[1.35] text-pretty whitespace-pre-line text-white">
          {step.caption}
        </p>
      </div>
    </article>
  );
}
