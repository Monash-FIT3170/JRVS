/**
 * @file UnitCard Component
 *
 * @description A card component displaying a unit with an icon, progress indicator, and title.
 * The card features a customizable background color for the icon area and displays
 * progress as a linear progress bar with percentage.
 *
 * @module UnitCard
 * @requires react
 * @requires @mui/material/Card
 * @requires @mui/material/CardContent
 * @requires @mui/material/Typography
 * @requires @mui/material/Icon
 * @requires @mui/material/LinearProgress
 * @requires @mui/material/Box
 *
 * @returns {JSX.Element} The rendered UnitCard component
 */

import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Icon from "@mui/material/Icon";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import UnitOverflowMenu from "./UnitOverflowMenu"; // Adjust the import path as needed

const UnitCard = ({
  title,
  progress,
  imageColour,
  icon,
  unit,
  userType,
  onDelete,
  noProgressBar,
}) => {
  return (
    <Card
      style={{ borderRadius: 15, position: "relative" }}
      className="unit-card"
    >
      <React.Fragment>
        <CardContent style={{ padding: 0 }}>
          <div
            style={{
              backgroundColor: imageColour,
              width: "100%",
              height: 240,
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <Icon style={{ fontSize: 160, color: "white" }}>{icon}</Icon>
          </div>
        </CardContent>
        <CardContent>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
              width: "calc(100% - 48px)", // Subtracting space for the menu icon
              marginRight: "48px", // Adding margin to prevent overlap
            }}
          >
            {title}
          </Typography>
          {!noProgressBar && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress variant="determinate" value={progress} />
              </Box>
              <Box sx={{ minWidth: 35 }}>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >{`${Math.round(progress)}%`}</Typography>
              </Box>
            </Box>
          )}
        </CardContent>
        <UnitOverflowMenu unit={unit} userType={userType} onDelete={onDelete} />
      </React.Fragment>
    </Card>
  );
};

export default UnitCard;
