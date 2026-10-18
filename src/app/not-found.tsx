import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="bg-mist-100 py-24">
      <div className="container-page max-w-2xl text-center">
        <p className="eyebrow">Page not found</p>
        <h1 className="h-display">We couldn&rsquo;t find that page</h1>
        <p className="lead mt-6">The page may have moved. Try one of these instead.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <ButtonLink href="/">Home</ButtonLink>
          <ButtonLink href="/sponsor-a-child" variant="secondary">Sponsor a Child</ButtonLink>
          <ButtonLink href="/donate" variant="secondary">Donate</ButtonLink>
        </div>
      </div>
    </section>
  );
}
