import Image from "next/image";

export function LiaisonSection() {
  return (
    <section className="relative" aria-hidden="true">
      <Image
        src="/images/background_link_section-1920.webp"
        alt=""
        width={3840}
        height={5782}
        sizes="100vw"
        className="block h-auto w-full"
      />
    </section>
  );
}
