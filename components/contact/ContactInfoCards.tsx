import Image from "next/image";
import Link from "next/link";

import { contactInfoCards } from "@/components/contact/contactContent";

type ContactInfoCardProps = {
  icon: string;
  title: string;
  description?: string;
  detail: string;
  href?: string;
};

function ContactInfoCard({
  icon,
  title,
  description,
  detail,
  href,
}: ContactInfoCardProps) {
  const content = (
    <>
      <div className="flex justify-center">
        <Image
          src={icon}
          alt=""
          width={42}
          height={42}
          className="h-10 w-auto object-contain sm:h-11"
        />
      </div>
      <h3 className="mt-4 text-base font-bold text-black sm:mt-5 sm:text-lg">
        {title}
      </h3>
      {description ? (
        <p className="mt-2 text-sm font-light leading-snug text-brand-gray sm:text-[0.9375rem]">
          {description}
        </p>
      ) : null}
      <p className="mt-2 text-sm font-light text-brand-gray sm:mt-3 sm:text-[0.9375rem]">
        {detail}
      </p>
    </>
  );

  const cardClassName =
    "flex w-full max-w-[15rem] flex-col items-center rounded-2xl border border-brand-border-light bg-white px-6 py-7 text-center shadow-sm sm:max-w-[17rem] sm:px-7 sm:py-8 lg:max-w-[18rem]";

  if (href) {
    return (
      <Link
        href={href}
        className={`${cardClassName} transition-opacity hover:opacity-85`}
      >
        {content}
      </Link>
    );
  }

  return <article className={cardClassName}>{content}</article>;
}

export default function ContactInfoCards() {
  return (
    <div className="mt-10 grid grid-cols-1 justify-items-center gap-2 sm:mt-12 sm:grid-cols-2 sm:gap-3 lg:mt-14 lg:grid-cols-3 lg:gap-3">
      {contactInfoCards.map((card) => (
        <ContactInfoCard
          key={card.id}
          icon={card.icon}
          title={card.title}
          description={card.description || undefined}
          detail={card.detail}
          href={"href" in card ? card.href : undefined}
        />
      ))}
    </div>
  );
}
