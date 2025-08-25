"use client";

import MainPageContainer from "@/components/ContainerStyles/MainPageContainer";
import GetInTouch from "@/components/GetInTouch/GetInTouch";
import LandingPage from "@/components/LandingPage/LandingPage";

export default function Home() {
  return (
    <>
      <MainPageContainer>
        <div className="flex items-center justify-center p-3 sm:p-10">
          <LandingPage />
        </div>
      </MainPageContainer>
      <GetInTouch />
    </>
  );
}
