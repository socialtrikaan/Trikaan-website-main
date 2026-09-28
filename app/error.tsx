"use client";

import Button from "@/components/ui/Button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-heading text-[48px] text-brand">Something went wrong</h1>
      <p className="max-w-md text-[16px] leading-[1.6] text-ink-600">
        An unexpected error occurred. Please try again.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}
