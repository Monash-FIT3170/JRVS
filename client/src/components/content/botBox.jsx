/**
 * @file BotBox.js
 * @description A React component that displays a box containing a 3D model of the JRVS mascot using the Spline library. The component allows customization of the box's appearance and the 3D model based on the provided avatar state.
 * @module BotBox
 * @requires @mui/material/Box
 * @requires @splinetool/react-spline
 *
 * @param {Object} props - The component props.
 * @param {string} [props.backgroundColor='#E6EBEF'] - The background color of the box.
 * @param {string} [props.width='350px'] - The width of the box.
 * @param {string} [props.height='400px'] - The height of the box.
 * @param {string} [props.boxShadow='0px 4px 4px rgba(0, 0, 0, 0.25)'] - The box shadow of the box.
 * @param {string} [props.avatarState='blue'] - The state of the avatar, which determines the 3D model scene to be displayed.
 *
 * @returns {JSX.Element} The rendered BotBox component.
 *
 * @example
 * <BotBox
 *   backgroundColor="#FFFFFF"
 *   width="400px"
 *   height="500px"
 *   boxShadow="0px 6px 6px rgba(0, 0, 0, 0.3)"
 *   avatarState="red"
 * />
 */

import React from "react";
import { Box } from "@mui/material";
import Spline from "@splinetool/react-spline";

export default function BotBox({
  backgroundColor = "#E6EBEF",
  width = "350px",
  height = "400px",
  boxShadow = "0px 4px 4px rgba(0, 0, 0, 0.25)",
  avatarState = "blue",
}) {
  // add new colors to this dictionary so that colours can be easily passed into this component
  const sceneLinks = {
    red: "https://prod.spline.design/xhKqPV8cj-jyQscz/scene.splinecode",
    purple: "https://prod.spline.design/aOANidimgpxXndCL/scene.splinecode",
    green: "https://prod.spline.design/CyFSS0rjnpEG3P2u/scene.splinecode",
    blue: "https://prod.spline.design/p2v7eOju-kg0Tp9B/scene.splinecode", // Default color
    noButton: "https://prod.spline.design/UKsFFROLunQ3WC5h/scene.splinecode",
  };

  return (
    <Box
      borderRadius={5}
      p={5}
      sx={{
        backgroundColor: backgroundColor,
        width: width,
        height: height,
        boxShadow: boxShadow,
      }}
    >
      <Spline
        style={{ width: "100%", height: "100%", alignContent: "center" }}
        scene={sceneLinks[avatarState]}
      />
    </Box>
  );
}
