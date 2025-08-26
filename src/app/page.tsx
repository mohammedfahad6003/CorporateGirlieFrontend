"use client";

import MainPageContainer from "@/components/ContainerStyles/MainPageContainer";
import GetInTouch from "@/components/GetInTouch/GetInTouch";
import LandingPage from "@/components/LandingPage/LandingPage";
import TestimonialsDisplay from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <MainPageContainer>
        <div className="flex items-center justify-center p-3 sm:p-10">
          <LandingPage />
        </div>
      </MainPageContainer>
      <TestimonialsDisplay />
      <GetInTouch />
    </>
  );
}
