"use client";

import { useState } from "react";

export default function Search(props: any) {
  return (
    <div className="container mx-auto">
      <input
        type="text"
        placeholder={`Search ${props.active.split("/")[1]}`}
        className="input input-bordered input-primary w-full text-center"
      />
    </div>
  );
}
