import React from "react";
import Marquee from "react-fast-marquee";

const reviews = [
  {
    img: "/mihai-moisa-dLOt3xltXuc-unsplash.jpg" ,// beach
  },
  {
    img: "/nature.jpg", // japan
  },
  {
    img: "/zhang-xupeng--wlxM5Ig_LI-unsplash.jpg", // mountains
  },
  {
    img: "/redd-francisco-nTBW1cOY1qI-unsplash.jpg", // italy
  },
  {
    img: "/phil-desforges-pPRFR24Avj0-unsplash.jpg", // bali
  },
  {
    img: "/fede-mambrin-Enb2r0bSTjk-unsplash.jpg", // road trip
  },
  {
    img: "/mihai-moisa-dLOt3xltXuc-unsplash.jpg", // road trip
  },
  {
    img: "/raimond-klavins-B-O-_NAbDpA-unsplash.jpg",},
  {
    img: "/pascal-debrunner-Ap53G_567Dc-unsplash.jpg", // road trip
  },
  {
    img: "/sarang-pande-k3SHcT9zGkE-unsplash.jpg", // road trip
  },

 
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);
const fallbackImg = "https://via.placeholder.com/300x200?text=Travel+Image";

// ✨ Updated: Only show image inside a card

  const ReviewCard = ({ img }) => {
    const handleImageError = (e) => {
      e.target.src = fallbackImg;
    };
  return (
    <div className="relative h-40 w-64 overflow-hidden rounded-xl border border-gray-300 bg-white/10 shadow-md">
      <img
        src={img}
        alt="Travel"
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        onError={handleImageError}
      />
    </div>
  );
};

const MarqueeDemo = () => {
  return (
    <div className="relative w-full overflow-hidden bg-black py-10">

      {/* ⬇️ PLACE THIS HERE — first row of sliding images */}
      <Marquee pauseOnHover direction="left" className="gap-4 [--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>

      {/* Optional: second row (reverse direction) */}
      <Marquee reverse pauseOnHover direction="right" className="gap-4 [--duration:20s] mt-6">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} img={review.img} />
        ))}
      </Marquee>

      {/* Left and right gradient overlays */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />
    </div>
  );
};


export default MarqueeDemo;
