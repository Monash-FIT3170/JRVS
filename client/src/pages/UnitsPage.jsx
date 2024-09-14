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

import { useApi } from "../context/ApiProvider";
import UnitCard from "../components/UnitCard";
import MenuBar from "../components/MenuBar";
import { Box } from "@mui/material";

const UnitsPage = () => {
  const { getData, postData } = useApi();
  const [units, setUnits] = useState();
  const [userData, setUserData] = useState();
  const [isUnitLoading, setIsUnitLoading] = useState(true);
  const [isUserDataLoading, setIsUserDataLoading] = useState(true);

  const isLoading = isUnitLoading || isUserDataLoading;

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
        setIsUserDataLoading(false);
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
              <UnitCard
                title={unit.title}
                progress={
                  ((userData?.assignedUnits.find(
                    (userUnit) => userUnit.unitId == unit._id
                  )?.lessonsCompleted.length || 0) / unit.numberOfLessons)*100
                }
                imageColour={unit.colour}
                icon={unit.icon}
              ></UnitCard>
            </Grid>
          ))
        )}
      </Grid>
    </div>
  );
};

export default UnitsPage;
