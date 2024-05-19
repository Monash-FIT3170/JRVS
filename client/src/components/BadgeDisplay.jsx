import React from "react";
import Badge1 from "../assets/images/Badge1.png";
import Badge2 from "../assets/images/Badge2.png";
import Badge3 from "../assets/images/Badge3.png";
import Badge4 from "../assets/images/Badge4.png";

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
  return (
    <div className="relative">
      <div className="flex items-center">
        <div className="w-full h-full overflow-y-scroll scroll-smooth" id="slider">
          <div className="grid grid-cols-3 gap-4 p-4">
            {badges.badges.map((badge, index) => (
              <div key={index} className="flex flex-col items-center">
                <img
                  className="h-[200px] p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                  src={getBadgeImage(badge.imagePath)}
                  alt="/"
                />
                <div className="text-lg font-bold">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BadgeContainer;

