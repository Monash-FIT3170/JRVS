import React from "react";
import Badge1 from "../assets/images/Badge1.png";
import Badge2 from "../assets/images/Badge2.png";
import Badge3 from "../assets/images/Badge3.png";
import Badge4 from "../assets/images/Badge4.png";
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

const badgeImages = {};
badgeImages['Default'] = Badge4;
badgeImages['Badge1'] = Badge1;
badgeImages['Badge2'] = Badge2;
badgeImages['Badge3'] = Badge3;

function getBadgeImage(badgeImage){
  if (badgeImages.hasOwnProperty(badgeImage)) {
    return badgeImages[badgeImage];
} else {
    return badgeImages['Default'];
}
}

function BadgeContainer(badges) {
  const slideLeft = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft - 400;
  };
  const slideRight = () => {
    var slider = document.getElementById('slider');
    slider.scrollLeft = slider.scrollLeft + 400;
  };
  return (
    <div className="relative flex items-center">
         <MdChevronLeft className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
      <div id="slider" className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide">
        {badges.badges.map((badge, index) => (
          <div key={index} className="relative inline-block">
          <img
            className="w-[200px] p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
            src={getBadgeImage(badge.imagePath)
              }
            alt="/"
          />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-1 text-lg font-bold">{badge.name}</div>
        </div>
        ))}
      </div>
      <MdChevronRight className='opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
    </div>
  );
}
export default BadgeContainer;
