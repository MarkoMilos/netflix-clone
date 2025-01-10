"use client";

import { useEffect, useState } from "react";

const TOP_OFFSET = 66;

export default function NavBar() {
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackground(window.scrollY >= TOP_OFFSET);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 -z-10 transition duration-300 ${showBackground ? "bg-background" : "bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)]"}`}
    />
  );
}
