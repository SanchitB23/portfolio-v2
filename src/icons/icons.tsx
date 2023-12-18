import React from "react";
import { IconNpm, IconStackoverflow } from "./index";
import { ICON_NAMES } from "@/constants";
import {
  ExternalLinkIcon,
  Folder,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface IconInterface {
  name: string;
  className?: string;
}

const Icon: React.FC<IconInterface> = ({ name, className }) => {
  switch (name) {
    case ICON_NAMES.GitHub:
      return <Github className={cn("h-6 w-6", className)} />;
    case ICON_NAMES.Linkedin:
      return <Linkedin className={cn("h-6 w-6", className)} />;
    case ICON_NAMES.Twitter:
      return <Twitter className={cn("h-6 w-6", className)} />;
    case ICON_NAMES.StackOverflow:
      return <IconStackoverflow className={className} />;
    case ICON_NAMES.NPM:
      return <IconNpm className={className} />;
    case ICON_NAMES.External:
      return <ExternalLinkIcon className={cn("h-6 w-6", className)} />;
    case ICON_NAMES.Folder:
      return <Folder className={cn("h-6 w-6", className)} />;
    default:
      return <ExternalLinkIcon className={cn("h-6 w-6", className)} />;
  }
};

export default Icon;
