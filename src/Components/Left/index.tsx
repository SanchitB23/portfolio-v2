import React from "react";
import { NAME, POSITION } from "@/constants";
import { getLeftData } from "@/services";
import Icon from "@/icons/icons";

const NAVS = ["about", "experience", "projects"];
const LeftComponent = async () => {
  const { socials, aboutMe } = await getLeftData();
  return (
    <header
      className={
        "lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-1/2 lg:flex-col lg:justify-between lg:py-24"
      }
    >
      <div>
        {/*Intro*/}
        <div>
          <a
            href={"/"}
            className="text-4xl font-bold sm:text-5xl tracking-tight	text-slate-200"
          >
            {aboutMe.personalName ?? NAME.full}
          </a>
          <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
            {aboutMe.designation ?? POSITION}
          </h2>
          <p className="mt-4 max-w-xs leading-normal">
            {aboutMe.oneLiner ??
              "I build exceptional and accessible digital experiences for the web."}
          </p>
        </div>
        {/*Nav*/}
        <nav
          className={"nav hidden lg:block"}
          aria-label={"In-page jump links"}
        >
          <ul className={"mt-16 w-max"}>
            {NAVS.map((val) => (
              <li key={val}>
                <a
                  className={"group flex items-center py-3 active uppercase"}
                  href={`#${val}`}
                >
                  <span
                    className={
                      "nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"
                    }
                  />
                  <span
                    className={
                      "nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200"
                    }
                  >
                    {val}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {/*Socials*/}
      <ul className={"ml-1 mt-8 flex items-center"} aria-label={"Social Media"}>
        {socials.map(({ name, socialUrl }) => (
          <li className={"mr-5 text-xs"} key={name}>
            <a
              className={"block hover:text-slate-200 cursor-pointer"}
              href={socialUrl}
              target="_blank"
              rel="noreferrer noopener"
            >
              <span className={"sr-only"}>{name}</span>
              <Icon name={name} />
            </a>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default LeftComponent;
