import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";

import { useApi } from "../context/ApiProvider";
import UnitCard from "../components/UnitCard";
import MenuBar from "../components/MenuBar";

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

    const routeChange = () => {
        let path = "/learningPath";
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
                            onClick={routeChange}
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
