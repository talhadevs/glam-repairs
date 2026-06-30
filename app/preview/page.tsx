import SkinAssessment from "@/components/home/SkinAssessment";

export default function PreviewPage() {
  return (
    <main className="bg-white">
      <style>{`section, section * { outline: 1px solid rgba(255,0,0,0.6); }`}</style>
      <SkinAssessment />
    </main>
  );
}
