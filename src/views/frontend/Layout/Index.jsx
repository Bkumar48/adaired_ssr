"use client";
import React, { lazy, useEffect } from "react";
import "./styles.scss";

const Layout = () => {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
      <div className="hello">hello</div>
    </>
  );
};

export default Layout;
