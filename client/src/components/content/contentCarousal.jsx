import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

export default function Carousel({boxes}) {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : boxes.length - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex < boxes.length - 1 ? prevIndex + 1 : 0));
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
        <Button onClick={handlePrev} sx={{color: '#3CA3EE'}}><ArrowBackIosNewIcon/></Button>
        <Box>{boxes[activeIndex]}</Box>
        <Button onClick={handleNext} sx={{color: '#3CA3EE'}}><ArrowForwardIosIcon/></Button>
        </Box>
    );
};