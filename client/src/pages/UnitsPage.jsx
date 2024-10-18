/**
 * @file UnitsPage.jsx
 * @description Renders the Units Page, displaying a list of units with their respective details. Includes functionality for routing to a learning path based on the selected unit.
 *
 * @module UnitsPage
 * @requires React
 * @requires useEffect
 * @requires useState
 * @requires @mui/material/Unstable_Grid2
 * @requires useNavigate
 * @requires ../context/ApiProvider
 * @requires ../components/UnitCard
 * @requires ../components/MenuBar
 * @requires triggerBadge from ../components/BadgeAchieve
 *
 * @component
 * @example
 * <UnitsPage />
 *
 * @returns {JSX.Element} The Units Page component
 */

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

import { useApi } from "../context/ApiProvider";
import UnitCard from "../components/UnitCard";
import MenuBar from "../components/MenuBar";
import CreateUnitDialog from "../components/CreateUnitDialog";
import UnitOverflowMenu from "../components/UnitOverflowMenu";
import { triggerBadge } from "../components/BadgeAchieve";

const UnitsPage = () => {
  const { getData, postData } = useApi();
  const [units, setUnits] = useState(undefined);
   
  const [userData, setUserData] = useState();
  const [userUnitProgress, setUserUnitProgress] = useState();
  const [isUserUnitProgressLoading, setIsUserUnitProgressLoading] =
    useState(true);
  const [isUnitLoading, setIsUnitLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [userType, setUserType] = useState();

  const isLoading =
    isUnitLoading || isUserDataLoading || isUserUnitProgressLoading;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const unitsResponse = await getData("api/units");
        setUnits(unitsResponse);
        setIsUnitLoading(false);

        const token = localStorage.getItem("token");
        const res = await postData("api/auth/current", { token });
        const userData = await getData(`api/users/id/${res.decoded.id}`);
        setUserType(userData.usertype);
        setUserData(userData);
        setIsUserDataLoading(false);

        const userUnits = await getData("api/userUnitProgress");
        setUserUnitProgress(userUnits);
        setIsUserUnitProgressLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData, postData]);

  const navigate = useNavigate();

  const routeChange = (unitId) => {
    let path = `/learningPath/${unitId}`;
    navigate(path);
  };

  const getUnitProgress = (unit) => {
    let numLessonsCompleted = userUnitProgress?.find(
      (userUnit) => userUnit.unitId === unit._id,
    )?.completedLessons.length;
    let progress = (numLessonsCompleted || 0) / unit.numberOfLessons;
    console.log(unit._id);
    if (progress === 1) {
      triggerBadge(unit._id, unit.title, userData, postData);
    }
    return progress * 100;
  };

  const handleCreateUnit = async ({ unitName, hexCode, icon }) => {
    try {
      const response = await postData(`api/units/`, {
        title: unitName,
        colour: hexCode,
        icon,
      });
      console.log(response);
      routeChange(response._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUnit = (deletedUnit) => {
    setUnits(units.filter((unit) => unit._id !== deletedUnit._id));
  };

  return (
    <div style={{ maxWidth: "100vw" }}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ></link>

      <Box sx={{ width: "100%", overflow: "hidden" }}>
        <MenuBar
          title="Unit Overview"
          subtitle="Get ready to learn more about AI today"
        ></MenuBar>
      </Box>

      {isLoading || userType !== "admin" ? null : (
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          style={{
            margin: "10px",
            marginLeft: "80px",
            marginTop: "30px",
            marginBottom: "-50px",
            padding: "10px 20px",
            fontSize: "16px",
            borderRadius: "10px",
            whiteSpace: "nowrap",
            backgroundColor: "#3ca3ee",
            color: "#fff",
          }}
        >
          + New Unit
        </Button>
      )}

      <CreateUnitDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onCreate={handleCreateUnit}
      />

      <Grid
        container
        rowSpacing={6}
        columnSpacing={5}
        padding={10}
        backgroundColor="white"
        width="100vw"
      >
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          units.map((unit) => (
            <Grid
              item
              xs={6}
              sm={6}
              md={4}
              lg={3}
              onClick={() => routeChange(unit._id)}
              key={unit._id}
            >
              <div style={{ position: "relative" }}>
                <UnitCard
                  title={unit.title}
                  progress={
                    userType !== "admin" && userType !== "teacher"
                      ? getUnitProgress(unit)
                      : 100
                  }
                  imageColour={unit.colour}
                  icon={unit.icon}
                />
                <UnitOverflowMenu
                  unit={unit}
                  onDelete={handleDeleteUnit}
                  onEdit={() => navigate(0)}
                  userType={userType}
                />
              </div>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default UnitsPage;
