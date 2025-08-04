// src/components/TerraOhadaPresentation.tsx
import React from "react";
import Video from "../assets/video/terraOhada_video.mp4";
import FeaturesSections from "../components/produit/FeaturesSections";
// import { SET_SUJETS_JURIDIQUES } from "../data/data";

const Produit: React.FC = () => {
  // console.log("object", SET_SUJETS_JURIDIQUES);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Section Héro - Titre et Vision */}
      <section className="relative text-white py-16 md:py-24">
        {/* <div className="absolute py-20 bg-ohada-blue-one h-[320px] opacity-30 inset-0 z-50 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 animate-fadeInDown">
            Présentation du produit{" "}
            <span className="text-yellow-300">TerraOhada</span>
          </h1>
          <p className="text-xl md:text-2xl  leading-relaxed max-w-3xl mx-auto animate-fadeInUp">
            Notre vision : rendre le droit OHADA accessible, compréhensible et
            exploitable.
          </p>
        </div> */}
        <div className="absolute -top-20 md:inset-0 z-20 h-[260px] md:h-[250px] overflow-hidden">
          <video
            src={Video}
            muted
            loop
            autoPlay
            className="w-full h-full object-contain md:object-cover"
          />
        </div>
      </section>

      <FeaturesSections />
    </div>
  );
};

export default Produit;
