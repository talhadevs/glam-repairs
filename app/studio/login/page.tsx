import LoginForm from "@/components/studio/LoginForm";
import StudioAuthCard from "@/components/studio/StudioAuthCard";

type LoginPageProps = {
  searchParams: Promise<{ error?: string; next?: string; "check-email"?: string }>;
};

export default async function StudioLoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const nextPath =
    params.next?.startsWith("/studio") && !params.next.startsWith("//")
      ? params.next
      : "/studio";

  return (
    <StudioAuthCard
      title="Sign in"
      description="Team access only. Use the email invited to Studio."
    >
      <LoginForm
        nextPath={nextPath}
        errorCode={params.error}
        checkEmail={params["check-email"] === "1"}
      />
    </StudioAuthCard>
  );
}
