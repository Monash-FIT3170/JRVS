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

const UnitsPage = () => {
  const { getData, postData } = useApi();
  const [units, setUnits] = useState(undefined);
  const [userData, setUserData] = useState();
  const [userUnitProgress, setUserUnitProgress] = useState();
  const [isUserUnitProgressLoading, setIsUserUnitProgressLoading] =
    useState(true);
  const [isUnitLoading, setIsUnitLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false); // Controls the create unit popup state

  const [userType, setUserType] = useState(); // User type

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
        setUserData(userData);
        setUserType(userData.usertype);
        setIsUserDataLoading(false);

        const userUnits = await getData("api/userUnitProgress");
        setUserUnitProgress(userUnits);
        setIsUserUnitProgressLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [getData]);

  const navigate = useNavigate();

  const routeChange = (unitId) => {
    let path = `/learningPath/${unitId}`;
    navigate(path);
  };

  const getUnitProgress = (unit) => {
    let numLessonsCompleted = userUnitProgress?.find(
      (userUnit) => userUnit.unitId == unit._id,
    )?.completedLessons.length;
    let progress = (numLessonsCompleted || 0) / unit.numberOfLessons;
    return progress * 100;
  };

  const handleCreateUnit = async ({ unitName, hexCode, icon }) => {
    console.log(`unitName: ${unitName}, hexCode: ${hexCode}, icon: ${icon}`);

    try {
      const response = await postData(`api/units/`, {
        title: unitName,
        colour: hexCode,
        icon,
      });
      console.log(response);

      // Navigate to the edit the page
      routeChange(response._id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUnit = async (unit) => {
    try {
      await postData(`api/units/${unit._id}/delete`, { unitId: unit._id }); // CHANGE THIS ROUTING **************
      setUnits(units.filter((u) => u._id !== unit._id));
    } catch (error) {
      console.error("Error deleting unit:", error);
    }
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

      {/* New unit button. Only display if current user is an admin */}
      {isLoading || userType !== "admin" ? null : (
        <Button
          // onClick={() => {handleCreateUnit("TestUnit", "search", "#A366FF");}}
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

      {/* Create Unit Dialog */}
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
            >
              <div style={{ position: "relative" }}>
                <UnitCard
                  title={unit.title}
                  progress={
                    userType !== "admin" && userType !== "teacher"
                      ? getUnitProgress(unit)
                      : 100 /* Teachers and admins always have 100% unit progress */
                  }
                  imageColour={unit.colour}
                  icon={unit.icon}
                />

                <UnitOverflowMenu
                  unit={unit}
                  onDelete={handleDeleteUnit}
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
