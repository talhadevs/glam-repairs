"use client";

import {
  StepBody,
  StepChoiceCard,
  StepChoiceList,
  StepHeader,
} from "@/components/steps";
import { useStepAnswer, useStepGate } from "@/lib/funnel/useStepAnswer";

type SpecialEventChoice =
  | "vacation"
  | "wedding"
  | "holiday"
  | "sporting-event"
  | "reunion"
  | "family-occasion"
  | "other"
  | "none";

type EventOption = {
  value: SpecialEventChoice;
  label: string;
  icon?: string;
};

const eventOptions: EventOption[] = [
  { value: "vacation", label: "Vacation", icon: "/svgs/Group (26).svg" },
  { value: "wedding", label: "Wedding", icon: "/svgs/Group 2085660850.svg" },
  { value: "holiday", label: "Holiday", icon: "/svgs/Group 2085660851.svg" },
  {
    value: "sporting-event",
    label: "Sporting event",
    icon: "/svgs/Group 2085660852.svg",
  },
  { value: "reunion", label: "Reunion", icon: "/svgs/Group 2085660918.svg" },
  {
    value: "family-occasion",
    label: "Family occasion",
    icon: "/svgs/Layer_x0020_1 (1).svg",
  },
  { value: "other", label: "Other" },
  {
    value: "none",
    label: "No - just ready to look and feel my best!",
  },
];

export default function SpecialEventStep() {
  const [selectedEvent, setSelectedEvent] = useStepAnswer<SpecialEventChoice | null>(
    "booking.specialEvent",
    null,
  );
  useStepGate(selectedEvent !== null);

  return (
    <div>
      <StepHeader
        title="Do you have a special event coming up?"
        subtitle="Having something to look forward to can be a great motivator for reaching your goal"
      />

      <StepBody>
        <StepChoiceList spacing="compact">
          {eventOptions.map((option) => (
            <StepChoiceCard
              key={option.value}
              variant="icon"
              iconSize="medium"
              labelStyle="snug"
              icon={option.icon}
              label={option.label}
              selected={selectedEvent === option.value}
              onSelect={() => setSelectedEvent(option.value)}
            />
          ))}
        </StepChoiceList>
      </StepBody>
    </div>
  );
}
