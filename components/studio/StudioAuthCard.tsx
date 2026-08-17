import Logo from "@/components/home/Logo";

type StudioAuthCardProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export default function StudioAuthCard({
  title,
  description,
  children,
}: StudioAuthCardProps) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-gradient-to-b from-brand-purple-soft via-white to-brand-lavender/30 px-4 py-10">
      <div className="w-full max-w-md rounded-[2rem] border border-brand-lavender/60 bg-white px-7 py-8 shadow-sm sm:px-9 sm:py-10">
        <Logo variant="color" className="mx-auto h-10" />
        <p className="mt-6 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-brand-accent">
          Studio
        </p>
        <h1 className="mt-2 text-center font-serif text-3xl text-brand-primary">
          {title}
        </h1>
        <p className="mt-2 text-center text-sm text-brand-gray">{description}</p>
        <div className="mt-8">{children}</div>
      </div>
    </div>
  );
}
