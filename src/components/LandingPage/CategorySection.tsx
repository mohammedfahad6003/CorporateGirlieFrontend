"use client";
import { RootState } from "@/store/store";
import { LandingPageContent } from "@/utils/commonJson";
import Image from "next/image";
import { useSelector } from "react-redux";
import CircleBadges from "./CircleBadges";

const CategorySection = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const borderColor = darkMode ? "border-yellow-400" : "border-gray-300";

  return (
    <div
      className={`${
        darkMode ? "bg-black text-white" : "bg-gray-50 text-black"
      } w-full`}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between lg:p-10 sm:p-8 p-6 sm:gap-10 lg:mx-12 mx-0">
        {/* --- Mobile: Top Images --- */}
        <div className="grid grid-cols-2 gap-4 w-full sm:hidden mb-8">
          {LandingPageContent.slice(0, 2).map((img) => (
            <div
              key={img.id}
              className={`relative h-[160px] sm:h-[200px] w-full ${
                img.id % 2 === 0 ? "sm:mt-4" : ""
              }`}
            >
              <Image
                src={img.imageLink}
                alt={img.imageTitle}
                fill
                className={`object-cover rounded-lg shadow-md border-2 ${borderColor}`}
                priority
              />
            </div>
          ))}
        </div>

        {/* --- Shared Content (Left Pane for Desktop / Middle for Mobile) --- */}
        <div className="flex-1 flex flex-col space-y-6">
          <div>
            <h1 className="text-3xl font-bold">Ready?</h1>
            <h1 className="text-3xl font-bold">To Paint the World?</h1>
          </div>
          <p className="text-sm max-w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus et
            asperiores reprehenderit, doloremque est culpa veniam quaerat,
            dignissimos vero quia rerum nam ipsam necessitatibus obcaecati
            commodi perspiciatis, reiciendis modi iste!
          </p>

          <button
            className={`px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg transition cursor-pointer w-fit sm:text-lg text-sm ${
              darkMode
                ? "bg-yellow-400 text-white hover:bg-yellow-300"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            Explore More
          </button>

          <CircleBadges />
        </div>

        {/* --- Desktop: 4 Images Grid --- */}
        <div className="flex-1 sm:grid grid-cols-2 gap-4 relative hidden">
          {LandingPageContent.slice(0, 4).map((img) => (
            <div
              key={img.id}
              className={`relative h-[250px] w-[90%] ${
                img.id % 2 === 0 ? "mt-6" : ""
              }`}
            >
              <Image
                src={img.imageLink}
                alt={img.imageTitle}
                fill
                className={`object-cover rounded-lg shadow-md border-2 ${borderColor}`}
                priority
              />
            </div>
          ))}
        </div>

        {/* --- Mobile: Bottom Images --- */}
        <div className="grid grid-cols-2 gap-6 w-full sm:hidden mt-6">
          {LandingPageContent.slice(2, 4).map((img) => (
            <div
              key={img.id}
              className={`relative h-[150px] sm:h-[200px] ${
                img.id % 2 === 0 ? "sm:mt-6" : ""
              }`}
            >
              <Image
                src={img.imageLink}
                alt={img.imageTitle}
                fill
                className={`object-cover rounded-lg shadow-md border-2 ${borderColor}`}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
