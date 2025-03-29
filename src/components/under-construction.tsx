import * as React from "react";

export const UnderConstruction = () => (
  <div
    className={
      "flex flex-col md:flex-row items-center md:items-start space-y-12 space-x-12 px-24 py-16 border-2 border-neutral"
    }
  >
    <div>
      <span className={"text-2xl font-bold"}>Under Construction</span>
      <p>This page is under construction. Please check back later.</p>
    </div>
  </div>
);
