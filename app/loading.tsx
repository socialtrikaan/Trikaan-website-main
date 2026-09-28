export default function Loading() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <span
        role="status"
        aria-label="Loading"
        className="size-10 animate-spin rounded-full border-4 border-border border-t-brand"
      />
    </div>
  );
}
