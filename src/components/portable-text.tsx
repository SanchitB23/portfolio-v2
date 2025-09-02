"use client";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import type { TypedObject } from "@portabletext/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="text-base leading-7 text-slate-300">{children}</p>
    ),
    h2: ({ children }) => <h2 className="text-xl font-semibold">{children}</h2>,
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        className="underline decoration-emerald-500 underline-offset-4"
      >
        {children}
      </a>
    ),
  },
};

export default function PT({ value }: { value: TypedObject | TypedObject[] }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
