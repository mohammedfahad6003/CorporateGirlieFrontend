import ProductsContainer from "@/components/ContainerStyles/ProductsContainer";
import React from "react";

const FestiveEdition = () => {
  return (
    <ProductsContainer>
      <h1 className="sm:text-3xl text-2xl font-bold mb-4">Festive Edition</h1>

      <p className="sm:text-lg text-base mt-3 sm:mt-4">{`Celebrate the season of joy with our exclusive Festive Edition – a vibrant collection of art, drawings, resin creations, home décor, and handcrafted pieces designed to bring colour and warmth to your celebrations. From intricate hand-drawn motifs and contemporary art, to shimmering resin coasters, decorative pooja thalis, and elegant home accents, each piece is made with love and inspired by festive traditions. Perfect for brightening up your space or gifting to loved ones, our Festive Edition combines creativity, culture, and craftsmanship to make every celebration truly special.`}</p>
    </ProductsContainer>
  );
};

export default FestiveEdition;
