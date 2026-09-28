import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="font-heading text-[64px] text-brand">404</h1>
      <p className="max-w-md text-[16px] leading-[1.6] text-ink-600">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button href="/">Back home</Button>
    </div>
  );
}
