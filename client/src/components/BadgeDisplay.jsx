/**
 * @file BadgeContainer.js
 * @description React component that renders a container for displaying user badges with tooltips. The component uses Material-UI's Tooltip for displaying badge details on hover and dynamically loads badge images.
 * @module BadgeContainer
 * @requires react
 * @requires @mui/material/Tooltip
 * @requires @mui/material/styles
 * @requires ../assets/soundeffects/badge_earned.wav
 * @requires ../assets/images/Badge1.png
 * @requires ../assets/images/Badge2.png
 * @requires ../assets/images/Badge3.png
 * @requires ../assets/images/Badge4.png
 * @requires ../assets/images/Badge_Shop.png
 * @param {Object} badges - Object containing badge data including image path, name, description, and time achieved.
 * @returns {JSX.Element} A container component that displays badges in a grid layout with hoverable tooltips showing badge details.
 * @example
 * // Example usage of BadgeContainer
 * const badges = [{ name: 'Badge1', description: 'First badge', timeAchieved: Date.now(), imagePath: 'Badge1' }];
 * <BadgeContainer badges={badges} />
 */

import React from "react";
import Badge1 from "../assets/images/Badge1.png";
import Badge2 from "../assets/images/Badge2.png";
import Badge3 from "../assets/images/Badge3.png";
import Badge4 from "../assets/images/Badge4.png";
import BadgeShop from "../assets/images/Badge_Shop.png";
import Tooltip from "@mui/material/Tooltip";
import { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
//import sound from "../assets/soundeffects/badge_earned.wav";
const badgeImages = {};
badgeImages["Default"] = Badge4;
badgeImages["Badge1"] = Badge1;
badgeImages["Badge2"] = Badge2;
badgeImages["Badge3"] = Badge3;
badgeImages["Badge_Shop"] = BadgeShop;

function getBadgeImage(badgeImage) {
  if (Object.prototype.hasOwnProperty.call(badgeImages, badgeImage)) {
    return badgeImages[badgeImage];
  } else {
    return badgeImages["Default"];
  }
}

function BadgeContainer(userData) {
  var badges = [];
  var seen = [];
  userData.badges.forEach((badge) => {
    if (!seen.includes(badge._id)) {
      seen.push(badge._id);
      badges.push(badge);
    }
  });
  // play badge earned audio - placeholder
  //const audio = new Audio(sound);
  //audio.play();
  //let badge_earned = new Audio('../assets/soundeffects/badge_earned.wav');
  //badge_earned.play();

  const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: "#3CA3EE",
      color: "rgba(0, 0, 0, 0.87)",
      fontSize: theme.typography.pxToRem(12),
      maxWidth: "calc(100vw / 6)",
    },
  }));

  return (
    <div className="relative">
      <div className="flex items-center">
        <div
          className="w-full h-full overflow-y-scroll scroll-smooth"
          id="slider"
        >
          <div className="grid grid-cols-3 gap-4 p-4">
            {badges.map((badge, index) => (
              <HtmlTooltip
                key={index}
                title={
                  <React.Fragment>
                    <div className="text-3xl font-bold text-white text-center mb-2">
                      {badge.name}
                    </div>
                    <div className="text-base text-white mb-2">
                      {badge.description}
                    </div>
                    <div className="text-base text-white font-bold">
                      Achieved:{" "}
                      {new Date(badge.timeAchieved).toLocaleDateString(
                        "en-GB",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                        },
                      )}
                    </div>
                  </React.Fragment>
                }
              >
                <div className="flex flex-col items-center">
                  <img
                    className="h-[200px] p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                    src={getBadgeImage(badge.imagePath)}
                    alt="/"
                  />
                  <div className="text-lg font-bold">{badge.name}</div>
                </div>
              </HtmlTooltip>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BadgeContainer;
