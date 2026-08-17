import NewCustomerForm from "@/components/studio/NewCustomerForm";

type NewCustomerPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function NewCustomerPage({
  searchParams,
}: NewCustomerPageProps) {
  const params = await searchParams;

  return (
    <div>
      <h1 className="font-serif text-3xl text-brand-primary">Add customer</h1>
      <p className="mt-1 text-sm text-brand-gray">
        Create a customer who did not come through the onboarding funnel.
      </p>
      <div className="mt-8">
        <NewCustomerForm errorCode={params.error} />
      </div>
    </div>
  );
}
