"use client";

import GetInTouch from "@/components/GetInTouch/GetInTouch";
import LandingPage from "@/components/LandingPage/LandingPage";
import TestimonialsDisplay from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <LandingPage />
      <TestimonialsDisplay />
      <GetInTouch />
    </>
  );
}
