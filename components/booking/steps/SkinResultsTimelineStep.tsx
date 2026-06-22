import SkinResultsTimeline from "@/components/booking/SkinResultsTimeline";
import { StepBody, StepHeader } from "@/components/steps";

export default function SkinResultsTimelineStep() {
  return (
    <div>
      <StepHeader
        title="Skin results timeline"
        subtitle="Most users see visible improvements within 4-12 weeks"
      />

      <StepBody>
        <SkinResultsTimeline />
      </StepBody>
    </div>
  );
}
