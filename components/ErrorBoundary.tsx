"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ErrorBoundaryProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  const router = useRouter();
  const isServerError = !!error.digest;

  useEffect(() => {
    // Log error to the crash reporting service
    // eslint-disable-next-line no-console
    console.error("Unhandled error:", error);
  }, [error]);

  const handleRetry = () => {
    if (isServerError) {
      window.location.reload();
    } else {
      reset();
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black">
      <div className="max-w-md rounded-md bg-red-700 p-6 text-center">
        <h2 className="mb-4 text-2xl font-bold text-white">Something went wrong</h2>
        <p className="mb-4 text-white">
          We&apos;re having trouble loading the content. Please try again later.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            type="button"
            onClick={handleRetry}
            className="rounded bg-white px-4 py-2 font-bold text-red-900 hover:bg-gray-200"
          >
            Try again
          </button>
          <button
            type="button"
            onClick={() => router.push("/")}
            className="rounded border border-white px-4 py-2 font-bold text-white hover:bg-red-800"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}
