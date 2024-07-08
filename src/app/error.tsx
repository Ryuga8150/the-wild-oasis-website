"use client";

type Props = {
  error: {
    message: string;
  };
  reset: () => {};
};

// this error boundary
// needs to be client always
// does not catches errors from layout
//alternate global eroor js
export default function Error({ error, reset }: Props) {
  return (
    <main className="flex justify-center items-center flex-col gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        className="inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg"
        onClick={reset}
      >
        Try again
      </button>
    </main>
  );
}