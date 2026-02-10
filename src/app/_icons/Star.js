import * as React from "react";
export const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <path
      fill="#FDE047"
      stroke="#FDE047"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m8 1.333 2.06 4.174 4.606.673-3.333 3.247.787 4.587L8 11.847l-4.12 2.167.786-4.587L1.333 6.18l4.607-.673L8 1.334Z"
    />
  </svg>
);
