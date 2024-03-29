import React from "react";

import "./Footer.css";

const Footer = () => (
  <div className="w-full absolute pin-b text-center mx-auto pb-6">
    <a
      rel="noopener noreferrer"
      target="_blank"
      href="https://github.com/ATholin/zeunerts-tracker"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10 feather feather-github text-grey-darkest"
      >
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    </a>
    <div className="mt-4 mb-3">
      <a
        href="mailto:atholin@atholin.se?Subject=Zeunerts%20Tracker:%20"
        target="_top"
      >
        <span className="text-grey-darker rounded bg-grey-lightest shadow p-4 inline-block hover:bg-grey-lighter">
          atholin@atholin.se
        </span>
      </a>
    </div>
  </div>
);

export default Footer;
