"use client";

import MainPageContainer from "@/components/ContainerStyles/MainPageContainer";
import GetInTouch from "@/components/GetInTouch/GetInTouch";

export default function Home() {
  return (
    <>
      <MainPageContainer>
        <div className="flex items-center justify-center">Home Container</div>
      </MainPageContainer>
      <GetInTouch />
    </>
  );
}
