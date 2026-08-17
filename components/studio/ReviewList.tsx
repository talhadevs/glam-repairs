import { REVIEW_DECISION_LABELS } from "@/lib/studio/constants";
import { formatStudioDateTime } from "@/lib/studio/formatDate";
import type { StudioReview } from "@/lib/studio/reviews";

type ReviewListProps = {
  reviews: StudioReview[];
};

export default function ReviewList({ reviews }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <p className="text-sm text-brand-gray">
        No team reviews yet. Assigned team members send a photo decision here.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {reviews.map((review) => (
        <li
          key={review.id}
          className="rounded-2xl border border-brand-lavender/70 bg-white px-4 py-3"
        >
          <p className="text-sm font-medium text-brand-primary">
            {REVIEW_DECISION_LABELS[review.decision]}
          </p>
          <p className="mt-1 text-xs text-brand-gray">
            {formatStudioDateTime(review.createdAt)} · {review.authorName}
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm text-brand-ink">
            {review.findings}
          </p>
          {review.noticed ? (
            <p className="mt-2 text-sm text-brand-gray">
              <span className="font-medium text-brand-ink">Noticed: </span>
              {review.noticed}
            </p>
          ) : null}
          {review.morningRoutine ? (
            <p className="mt-1 text-sm text-brand-gray">
              <span className="font-medium text-brand-ink">AM: </span>
              {review.morningRoutine}
            </p>
          ) : null}
          {review.nightRoutine ? (
            <p className="mt-1 text-sm text-brand-gray">
              <span className="font-medium text-brand-ink">PM: </span>
              {review.nightRoutine}
            </p>
          ) : null}
          {review.avoidItems ? (
            <p className="mt-1 whitespace-pre-wrap text-sm text-brand-gray">
              <span className="font-medium text-brand-ink">Avoid: </span>
              {review.avoidItems}
            </p>
          ) : null}
          {review.extraNotes ? (
            <p className="mt-1 text-sm text-brand-gray">
              <span className="font-medium text-brand-ink">Notes: </span>
              {review.extraNotes}
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
