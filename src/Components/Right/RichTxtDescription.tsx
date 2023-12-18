import React from "react";
import { Badge } from "@/Components/ui/badge";

interface Props {
  aboutMe: string;
  techStack: string[];
}
const RichTxtDescription = ({ aboutMe, techStack }: Props) => {
  console.log(techStack);
  return (
    <section className={"mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"}>
      <div
        className={
          "sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0"
        }
      >
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
          About
        </h2>
      </div>
      <div
        dangerouslySetInnerHTML={{ __html: aboutMe }}
        className={
          "[&>p>a:hover]:text-teal-300 [&>p>a]:text-white [&>p>a]:font-medium"
        }
      />
      <ol className={"mt-4 grid grid-cols-2 gap-1 text-sm"}>
        {techStack.map((item) => (
          <li key={item} className={"cursor-default"}>
            <Badge>{item}</Badge>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default RichTxtDescription;
