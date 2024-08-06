import React, { useEffect, useState, useCallback } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from "react-router-dom";

import { useApi } from "../context/ApiProvider";
import UnitCard from "../components/UnitCard";
import MenuBar from "../components/MenuBar";

const UnitsPage = () => {
    const { getData } = useApi();
    const [units, setUnits] = useState([]);
    const [isUnitLoading, setIsUnitLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        try {
            const unitsResponse = await getData("api/units");
            setUnits(unitsResponse);
            setIsUnitLoading(false);
        } catch (error) {
            setError("Failed to load units.");
            setIsUnitLoading(false);
        }
    }, [getData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const navigate = useNavigate();

    const routeChange = useCallback((unitId) => {
        console.log(unitId);
        let path = `/learningPath/${unitId}`;
        navigate(path);
    }, [navigate]);

    return (
        <div>
            <MenuBar
                title="Unit Overview"
                subtitle="Get ready to learn more about AI today"
            />
            <Grid
                container
                rowSpacing={6}
                columnSpacing={5}
                padding={10}
                backgroundColor="white"
            >
                {error && <div className="error">{error}</div>}
                {isUnitLoading ? (
                    <div className="spinner"></div>
                ) : (
                    units.map((unit) => (
                        <Grid
                            key={unit._id} // Add key here
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
                            />
                        </Grid>
                    ))
                )}
            </Grid>
        </div>
    );
};

export default UnitsPage;