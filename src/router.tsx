
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Others from "./pages/Others";
import { NotFound } from "./pages/NotFound";

export const Router = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/other" element={<Others />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
