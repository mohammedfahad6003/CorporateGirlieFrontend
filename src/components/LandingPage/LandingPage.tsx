"use client";
import React from "react";
import CategorySection from "./CategorySection";
import HomePageSlider from "./HomePageSlider";
import CollectionsSection from "./CollectionsSection";

const LandingPage = () => {
  return (
    <>
      <HomePageSlider />
      <CategorySection />
      <CollectionsSection />
    </>
  );
};

export default LandingPage;
