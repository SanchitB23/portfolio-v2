// app/projects/loading.tsx
export default function Loading() {
  return (
    <section className="bg-bg-primary py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-6 h-8 w-64 animate-pulse rounded bg-bg-tertiary" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl bg-bg-secondary"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
