"use client";

import ErrorBoundary from "@/components/ErrorBoundary";

export default function GlobalError({
  error,
  reset = () => {},
}: {
  error: Error;
  reset?: () => void;
}) {
  return (
    <ErrorBoundary
      error={error}
      reset={reset}
      title="A Global Error Occurred"
      message="Something went wrong across the application."
    />
  );
}
