"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="text-center text-sm py-4 backdrop-blur-md bg-white/30 border-t border-white/20">
      © {new Date().getFullYear()} All rights reserved.
    </footer>
  );
};

export default Footer;
