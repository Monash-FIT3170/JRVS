import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { useApi } from "../context/ApiProvider";
import UnitCard from "../components/UnitCard";
import MenuBar from "../components/MenuBar";

import NewLessons from "../components/newLessons";

const UnitsPage = () => {
    const { getData } = useApi();
    const [units, setUnits] = useState(undefined);
    const [isUnitLoading, setIsUnitLoading] = useState(true); // set loading spinner

    useEffect(() => {
        const fetchData = async () => {
            try {
                const unitsResponse = await getData("api/units");
                setUnits(unitsResponse);
                setIsUnitLoading(false);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [getData]);

    const navigate = useNavigate();

    const routeChange = (unitId) => {
      console.log(unitId);
      let path = `/learningPath/${unitId}`;
        navigate(path);
    };

    return (

        <div>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/icon?family=Material+Icons"
            ></link>

            <MenuBar
                title="Unit Overview"
                subtitle="Get ready to learn more about AI today"
            ></MenuBar>
            
              <Box sx={{ marginTop: '20px', marginLeft: '20px' }}>
                    <NewLessons />
                </Box>
            <Grid
                container
                rowSpacing={6}
                columnSpacing={5}
                padding={10}
                backgroundColor="white"
            >
                {isUnitLoading ? (
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
                                progress={70} // TODO: placeholder
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
