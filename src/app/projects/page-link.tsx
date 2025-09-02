"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function PageLink({
  page,
  disabled,
  children,
}: {
  page: number;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString() || "");
  params.set("page", String(Math.max(1, page)));
  if (disabled) return <span className="text-slate-600">{children}</span>;
  return (
    <Link
      href={`/projects?${params.toString()}`}
      className="text-emerald-300 hover:text-emerald-200"
    >
      {children}
    </Link>
  );
}
