import React from "react";
import { cn } from "@/lib/utils";

const StackOverflow = ({ className }: { className?: string }) => {
  return (
    <svg
      className={cn("h-6 w-6 hover:fill-amber-700", className)}
      viewBox="0 0 100 118"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M84.072 107.351V75.8H94.588V117.869H0V75.8H10.516V107.351H84.072Z"
        fill="#A8B2D1"
      />
      <path
        d="M73.1605 83.1208L22.6812 72.5115L24.6385 63.1982L75.1179 73.8075L73.1605 83.1208ZM76.3209 69.7937L29.5614 48.0168L33.5792 39.3903L80.3386 61.1672L76.3209 69.7937ZM82.4288 57.8198L42.7922 24.8098L48.8822 17.4972L88.5188 50.5072L82.4288 57.8198ZM91.2168 47.7674L60.4326 6.37879L68.0682 0.699595L98.8524 42.0882L91.2168 47.7674ZM73.126 86.816V96.333H21.544V86.816H73.126Z"
        stroke="#A8B2D1"
      />
    </svg>
  );
};

export default StackOverflow;