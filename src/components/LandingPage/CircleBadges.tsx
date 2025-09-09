"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaintBrush, // Painting
  faPencilAlt, // Drawing
  faTruck, // Deliveries
  faGem, // Resin Art
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CircleBadges = () => {
  const darkMode = useSelector((state: RootState) => state.theme.darkMode);

  const cards = [
    {
      icon: faPaintBrush,
      title: "Painting",
      description: "Beautiful hand-painted artwork crafted with precision.",
    },
    {
      icon: faPencilAlt,
      title: "Drawing",
      description: "Detailed sketches and illustrations with fine lines.",
    },
    {
      icon: faTruck,
      title: "Deliveries",
      description: "Fast and reliable deliveries to your doorstep.",
    },
    {
      icon: faGem,
      title: "Resin Art",
      description: "Unique resin creations with a modern, glossy finish.",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 sm:mx-auto my-4 sm:mt-10">
      {cards.map((card, i) => (
        <div key={i} className={`flex items-start gap-4`}>
          {/* Icon */}
          <div
            className={`w-14 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-xl border-2 text-xl p-2 sm:p-4
              ${
                darkMode
                  ? "bg-black border-yellow-400 text-yellow-400"
                  : "bg-gray-900 border-gray-800 text-white"
              }`}
          >
            <FontAwesomeIcon
              icon={card.icon}
              className="text-base sm:text-lg"
            />
          </div>

          {/* Content */}
          <div>
            <h3
              className={`text-base sm:text-lg font-bold ${
                darkMode ? "text-white" : "text-gray-900"
              }`}
            >
              {card.title}
            </h3>
            <p
              className={`${
                darkMode ? "text-gray-300" : "text-gray-600"
              } text-xs sm:text-sm`}
            >
              {card.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CircleBadges;
